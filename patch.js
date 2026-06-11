const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `        function buildFAQ() {
            const container = document.getElementById('faq-container');
            faqs.forEach((item, i) => {
                const div = document.createElement('div');
                div.className = 'luxury-glass rounded-2xl border border-slate-200 overflow-hidden';
                div.innerHTML = \`
                    <button onclick="toggleFAQ(\${i})" class="w-full p-6 flex items-start justify-between text-left gap-4 group">
                        <span class="text-sm font-semibold text-slate-800 group-hover:text-slate-900 transition leading-snug">\${item.q}</span>
                        <i id="faq-chevron-\${i}" class="fa-solid fa-chevron-down faq-chevron text-brand-gold text-xs shrink-0 mt-1"></i>
                    </button>
                    <div id="faq-answer-\${i}" class="faq-answer">
                        <p class="text-xs text-slate-600 font-light leading-relaxed px-6 pb-6">\${item.a}</p>
                    </div>
                \`;
                container.appendChild(div);
            });
        }`;

const replacement = `        function buildFAQ() {
            const container = document.getElementById('faq-container');
            faqs.forEach((item, i) => {
                const div = document.createElement('div');
                div.className = 'luxury-glass rounded-2xl border border-slate-200 overflow-hidden';

                const button = document.createElement('button');
                button.onclick = () => toggleFAQ(i);
                button.className = 'w-full p-6 flex items-start justify-between text-left gap-4 group';

                const span = document.createElement('span');
                span.className = 'text-sm font-semibold text-slate-800 group-hover:text-slate-900 transition leading-snug';
                span.textContent = item.q;

                const icon = document.createElement('i');
                icon.id = \`faq-chevron-\${i}\`;
                icon.className = 'fa-solid fa-chevron-down faq-chevron text-brand-gold text-xs shrink-0 mt-1';

                button.appendChild(span);
                button.appendChild(icon);

                const answerDiv = document.createElement('div');
                answerDiv.id = \`faq-answer-\${i}\`;
                answerDiv.className = 'faq-answer';

                const p = document.createElement('p');
                p.className = 'text-xs text-slate-600 font-light leading-relaxed px-6 pb-6';
                p.textContent = item.a;

                answerDiv.appendChild(p);

                div.appendChild(button);
                div.appendChild(answerDiv);

                container.appendChild(div);
            });
        }`;

html = html.replace(target, replacement);
fs.writeFileSync('index.html', html, 'utf8');
