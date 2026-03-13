(function() {
      const form = document.getElementById('dx-form');

      const requestType = document.getElementById('request_type');
      const requestTypeHelp = document.getElementById('request_type_help');

      const otherGroup = document.getElementById('other_specify_group');
      const otherField = document.getElementById('other_specify');

      const redirectGroupInner = document.getElementById('redirect_group_inner');
      const sourceUrl = document.getElementById('source_url');
      const targetUrl = document.getElementById('target_url');

      const decommissionGroup = document.getElementById('decommission_group');
      const siteOwner = document.getElementById('site_owner');
      const confirmSiteOwner = document.getElementById('confirm_site_owner');

      const outageGroup = document.getElementById('outage_group');
      const isOutage = document.getElementById('is_outage');
      const priorityGroup = document.getElementById('priority_group');

      const errors = document.getElementById('form_errors');
      const ok = document.getElementById('form_ok');

      const helpText = {
        '': '',
        'website_issue': 'Use for break/fix and minor operational updates when the site is up.',
        'outage': 'Use only when the production site is down or unusable. This routes as an Incident.',
        'redirect': 'Use for vanity/301 redirects. Source URL and Target URL are required.',
        'decommission': 'Use only for retiring a site/domain. Site Owner attestation and Site Owner selection are required.',
        'other': 'Use for DX website operations that do not fit the above. Provide a short label in Other (Please Specify).'
      };

      function show(el) { el.classList.remove('hidden'); }
      function hide(el) { el.classList.add('hidden'); }

      function setRequired(el, isReq) {
        if (isReq) {
          el.setAttribute('required', 'required');
          el.setAttribute('aria-required', 'true');
        } else {
          el.removeAttribute('required');
          el.setAttribute('aria-required', 'false');
        }
      }

      function applyRules() {
        const rt = requestType.value;
        requestTypeHelp.textContent = helpText[rt] || '';

        // Reset visibility
        hide(otherGroup);
        hide(redirectGroupInner);
        hide(decommissionGroup);
        hide(outageGroup);
        hide(priorityGroup);

        // Reset requireds
        setRequired(otherField, false);
        setRequired(sourceUrl, false);
        setRequired(targetUrl, false);
        setRequired(siteOwner, false);
        confirmSiteOwner.required = false;

        // Clear outage defaults
        isOutage.value = '';

        if (rt === 'other') {
          show(otherGroup);
          setRequired(otherField, true);
        }

        if (rt === 'redirect') {
          show(redirectGroupInner);
          setRequired(sourceUrl, true);
          setRequired(targetUrl, true);
        }

        if (rt === 'decommission') {
          show(decommissionGroup);
          setRequired(siteOwner, true);
          confirmSiteOwner.required = true;
        }

        if (rt === 'outage') {
          show(outageGroup);
          show(priorityGroup);
          isOutage.value = 'Yes';
          setRequired(isOutage, true);
        } else {
          setRequired(isOutage, false);
        }
      }

      requestType.addEventListener('change', applyRules);

      document.getElementById('btn_reset').addEventListener('click', () => {
        form.reset();
        applyRules();
        hide(errors);
        hide(ok);
      });

      form.addEventListener('submit', (e) => {
        e.preventDefault();
        hide(errors);
        hide(ok);

        const missing = [];

        // Built-in required validation
        const requiredFields = form.querySelectorAll('[required]');
        requiredFields.forEach(f => {
          const isCheckbox = f.type === 'checkbox';
          const empty = isCheckbox ? !f.checked : !String(f.value || '').trim();
          if (empty) {
            const label = form.querySelector(`label[for="${f.id}"]`);
            missing.push(label ? label.textContent.replace('*','').trim() : f.name);
          }
        });

        // If redirect, basic URL sanity (prototype-level)
        if (requestType.value === 'redirect') {
          const su = String(sourceUrl.value || '').trim();
          const tu = String(targetUrl.value || '').trim();
          if (su && !/^https?:\/\//i.test(su)) missing.push('Source URL (must start with http:// or https://)');
          if (tu && !/^https?:\/\//i.test(tu)) missing.push('Target URL (must start with http:// or https://)');
        }

        if (missing.length) {
          errors.textContent = 'Missing/invalid required fields:\n- ' + missing.join('\n- ');
          show(errors);
          return;
        }

        // Prototype "submission" summary
        const payload = {
          requested_for: form.requested_for.value,
          website: form.website.value,
          request_type: form.request_type.options[form.request_type.selectedIndex].text,
          other_specify: form.other_specify.value,
          source_url: form.source_url.value,
          target_url: form.target_url.value,
          site_owner: form.site_owner.value,
          confirm_site_owner: form.confirm_site_owner.checked,
          is_outage: form.is_outage.value,
          priority: form.priority.value,
          description: form.description.value,
          date_change: form.date_change.value,
          effective_time: form.effective_time.value,
          more_info: form.more_info.value,
          attachments_count: (form.attachments.files || []).length
        };

        ok.textContent = 'Prototype submit OK. Payload:\n' + JSON.stringify(payload, null, 2);
        show(ok);
      });

      // Initial state
      applyRules();
    })();
