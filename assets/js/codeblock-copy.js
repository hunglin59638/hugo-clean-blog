document.addEventListener('DOMContentLoaded', function () {
  console.log('[copy-btn] DOMContentLoaded fired');
  var btns = document.querySelectorAll('.code-block-wrapper .copy-btn');
  console.log('[copy-btn] Found copy-btn count:', btns.length);
  btns.forEach(function (btn, idx) {
    console.log('[copy-btn] Attaching click event to btn', idx, btn);
    btn.addEventListener('click', function () {
      console.log('[copy-btn] Button clicked!');
      var wrapper = btn.closest('.code-block-wrapper');
      if (!wrapper) {
        console.log('[copy-btn] No wrapper found');
        return;
      }
      var codeEl = wrapper.querySelector('.highlight pre code');
      if (!codeEl) {
        var chromaTd = wrapper.querySelector('.highlight .chroma .lntable tr td.lntd:last-child pre code');
        if (chromaTd) codeEl = chromaTd;
      }
      if (!codeEl) {
        console.log('[copy-btn] No code element found');
        return;
      }
      var codeText = '';
      if (codeEl.childElementCount > 0 && codeEl.querySelectorAll('span.ln, span.lnt').length === 0) {
        codeText = Array.from(codeEl.childNodes).map(function(node) {
          return node.textContent;
        }).join('');
      } else {
        codeText = codeEl.textContent;
      }
      console.log('[copy-btn] Copying text:', codeText);
      navigator.clipboard.writeText(codeText).then(function () {
        var icon = btn.querySelector('.copy-icon');
        if (!icon) {
          console.log('[copy-btn] No .copy-icon found');
          return;
        }
        var original = icon.outerHTML;
        icon.outerHTML = '<svg class="copy-icon copied" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M5 11l4 4 6-7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        btn.disabled = true;
        console.log('[copy-btn] Changed to checkmark, will restore immediately');
        var copiedIcon = btn.querySelector('.copy-icon.copied');
        if (copiedIcon) {
          copiedIcon.outerHTML = original;
          console.log('[copy-btn] Restored to original icon');
        } else {
          console.log('[copy-btn] No .copy-icon.copied found for restore');
        }
        btn.disabled = false;
      });
    });
  });
});
