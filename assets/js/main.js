// ── Mobile Nav ──────────────────────────────────────────
        function toggleMobileNav() {
            document.getElementById('mobile-nav').classList.toggle('open');
        }

        // ── Catalogue Filter ────────────────────────────────────
        function filterCatalogue(cat) {
            document.querySelectorAll('.catalogue-item').forEach(el => {
                if (cat === 'all' || el.dataset.cat === cat) {
                    el.style.display = '';
                } else {
                    el.style.display = 'none';
                }
            });
            document.querySelectorAll('.cat-tab').forEach(btn => {
                const isActive = btn.dataset.cat === cat;
                btn.classList.toggle('active-tab', isActive);
                btn.classList.toggle('border-brand-gold/40', isActive);
                btn.classList.toggle('text-brand-gold', isActive);
                btn.classList.toggle('bg-brand-gold/10', isActive);
                btn.classList.toggle('border-slate-300', !isActive);
                btn.classList.toggle('text-slate-600', !isActive);
                btn.classList.toggle('bg-transparent', !isActive);
            });
        }

        // ── Estimator ───────────────────────────────────────────
        let currentProduct = "WPC Customized Door";
        let currentStyleCode = "teak-modern";

        const baseProductCosts = {
            "WPC Customized Door": 4800,
            "WFC Doors & Frames": 6500,
            "PVC Designer Door": 4200,
            "Premium Lockset Fittings": 1500
        };

        const styleMetadata = {
            "teak-modern": {
                woodClass: "wood-teak-grain",
                panelsHTML: `<div class="w-full h-16 border border-black/30 bg-black/15 rounded shadow-sm"></div><div class="w-full h-28 border border-black/30 bg-black/15 rounded shadow-sm my-3"></div><div class="w-full h-16 border border-black/30 bg-black/15 rounded shadow-sm"></div>`,
                desc: "Teak Gold + S-13"
            },
            "charcoal-lines": {
                woodClass: "wood-charcoal-grain",
                panelsHTML: `<div class="w-full h-4 border-b border-black/40"></div><div class="w-full h-4 border-b border-black/40 mt-3"></div><div class="w-full h-4 border-b border-black/40 mt-3"></div><div class="w-full h-4 border-b border-black/40 mt-3"></div><div class="w-full h-4 border-b border-black/40 mt-3"></div>`,
                desc: "Charcoal Onyx + Lines"
            },
            "rose-classic": {
                woodClass: "wood-rose-grain",
                panelsHTML: `<div class="w-full h-24 border-2 border-black/20 bg-black/10 rounded-t-full flex items-center justify-center"><div class="w-8 h-8 border border-black/10 rounded-full"></div></div><div class="w-full h-16 border-2 border-black/20 bg-black/10 rounded mt-4"></div><div class="w-full h-16 border-2 border-black/20 bg-black/10 rounded mt-3"></div>`,
                desc: "Rosewood + S-106"
            },
            "ivory-clean": {
                woodClass: "wood-ivory-grain",
                panelsHTML: `<div class="w-full h-full border border-black/10 rounded-md flex items-center justify-center text-[10px] text-neutral-800 tracking-widest uppercase">Ivory Flat</div>`,
                desc: "Ivory Cream + Flat"
            }
        };

        function updateEstProduct() {
            currentProduct = document.getElementById('est-product').value;
            runQuoteCalculation();
        }

        function syncCanvasSelections() {
            const styleCode = document.getElementById('est-style').value;
            currentStyleCode = styleCode;
            const doorBody = document.getElementById('render-door-body');
            const doorPanels = document.getElementById('render-door-panels');
            const canvasTag = document.getElementById('canvas-style-tag');
            const styleObj = styleMetadata[styleCode];
            doorBody.className = "w-full h-full rounded-sm flex flex-col justify-between p-4 relative overflow-hidden transition-all duration-500 shadow-xl " + styleObj.woodClass;
            doorPanels.innerHTML = styleObj.panelsHTML;
            canvasTag.innerText = styleObj.desc;
            runQuoteCalculation();
        }

        function runQuoteCalculation() {
            const thickness = document.getElementById('est-thickness').value;
            const qty = parseInt(document.getElementById('est-qty').value) || 1;
            const withLock = document.getElementById('est-lock').checked;
            let mult = 1.0;
            if (thickness === "25mm") mult = 0.9;
            if (thickness === "35mm") mult = 1.15;
            if (thickness === "40mm") mult = 1.3;
            const base = baseProductCosts[currentProduct] || 4800;
            let perUnit = base * mult;
            if (withLock) perUnit += 1200;
            const min = Math.round(perUnit * qty);
            const max = Math.round(perUnit * 1.2 * qty);
            document.getElementById('est-final-range').innerText = `₹${min.toLocaleString('en-IN')} – ₹${max.toLocaleString('en-IN')}`;
        }

        function forwardConfigurationToWhatsApp() {
            const name = document.getElementById('cust-name').value.trim() || "Builder";
            const phone = document.getElementById('cust-phone').value.trim() || "Not provided";
            const msg = `*NEW SPECIFICATION REQUEST — WINDOOR*\n\n*Name/Firm:* ${name}\n*Phone/Location:* ${phone}\n*Product:* ${currentProduct}\n*Style:* ${styleMetadata[currentStyleCode].desc}\n*Thickness:* ${document.getElementById('est-thickness').value}\n*Brand:* ${document.getElementById('est-brand').value}\n*Quantity:* ${document.getElementById('est-qty').value} pcs\n*Estimate Range:* ${document.getElementById('est-final-range').innerText}\n\n_Via Windoor Hanamkonda Web Portal._`;
            window.open(`https://wa.me/919642585067?text=${encodeURIComponent(msg)}`, '_blank');
        }

        // ── Contact Form ────────────────────────────────────────
        function handleShowroomSubmit(event) {
            event.preventDefault();
            const name = document.getElementById('contact-name').value;
            const phone = document.getElementById('contact-phone').value;
            const msg = document.getElementById('contact-message').value;
            // Forward to WhatsApp
            const waText = `*NEW CONSULTATION REQUEST*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Details:* ${msg}\n\n_Via Windoor Contact Form._`;
            window.open(`https://wa.me/919642585067?text=${encodeURIComponent(waText)}`, '_blank');
            showStatusModal("Request Sent!", `Thank you ${name}! Your enquiry has been forwarded to our team. We'll call you at ${phone} shortly.`);
            document.getElementById('contact-showroom-form').reset();
        }

        // ── Modal ───────────────────────────────────────────────
        function showStatusModal(title, text) {
            document.getElementById('modal-title').innerText = title;
            document.getElementById('modal-desc').innerText = text;
            const m = document.getElementById('status-modal');
            m.classList.remove('opacity-0', 'pointer-events-none');
            m.classList.add('opacity-100');
        }
        function hideStatusModal() {
            const m = document.getElementById('status-modal');
            m.classList.add('opacity-0', 'pointer-events-none');
            m.classList.remove('opacity-100');
        }

        // ── FAQ ──────────────────────────────────────────────────
        const faqs = [
            {
                q: "What's the difference between WPC and WFC doors?",
                a: "WPC (Wood Plastic Composite) doors are made entirely of polymer composite material — 100% waterproof, termite-proof, and maintenance-free. WFC (Wood Fiber Composite) doors use a fiber-core construction and are usually sold as a door+frame integrated set. WPC is better for moisture-heavy areas (bathrooms, kitchens); WFC is popular for main entries and bedrooms."
            },
            {
                q: "Do you supply custom door sizes and non-standard frame widths?",
                a: "Yes. We supply all doors in custom heights (6'6\" to 8'0\"), widths (2'6\" to 4'0\"), and thickness (25mm to 40mm). Frame widths are available from 3\" to 6\" to suit different wall thicknesses. Just share your wall thickness and opening measurements on WhatsApp."
            },
            {
                q: "What brands do you carry and are you an authorized dealer?",
                a: "We are authorized dealers for Elegant Doors & Ply, Ecoste™ Wood Polymer, Black Cobra Engineered Wood, Masonite Molded Series, GMG Premium Ply, and Spider® Safety Hardware. This means you receive genuine manufacturer-batch products with valid warranty and quality assurance."
            },
            {
                q: "Do you offer bulk / contractor pricing for large projects?",
                a: "Yes. Orders of 10+ units qualify for special contractor pricing. For large apartment or commercial projects (50+ units), we offer project-rate quotations directly from the manufacturer. Contact us on WhatsApp with your project size and timeline."
            },
            {
                q: "Do you provide installation services or only supply?",
                a: "We provide end-to-end service — supply, safe delivery to your site in Warangal/Hanamkonda/Hyderabad, and precision installation through our trained carpentry team. Installation includes mortise lock pocketing, hinge fitting, and door closer alignment."
            },
            {
                q: "How long does delivery take after order confirmation?",
                a: "Standard stock items are delivered within 3–5 working days to Warangal and Hanamkonda. Custom size orders typically take 7–12 working days depending on the manufacturer's production schedule. We confirm delivery timelines at the time of order."
            },
            {
                q: "What finishes and laminates are available?",
                a: "Available finishes include Golden Teak, Walnut, Ash Wood, Imperial Rosewood, Charcoal Onyx, Ivory Cream, and custom laminates on request. PVC designer doors come in S-13 and S-106 panel styles. Hardware finishes include SS (Stainless Steel), AB (Antique Brass), and PB (Polished Brass)."
            }
        ];

        function buildFAQ() {
            const container = document.getElementById('faq-container');
            faqs.forEach((item, i) => {
                const div = document.createElement('div');
                div.className = 'luxury-glass rounded-2xl border border-slate-200 overflow-hidden';
                div.innerHTML = `
                    <button onclick="toggleFAQ(${i})" class="w-full p-6 flex items-start justify-between text-left gap-4 group">
                        <span class="text-sm font-semibold text-slate-800 group-hover:text-slate-900 transition leading-snug">${item.q}</span>
                        <i id="faq-chevron-${i}" class="fa-solid fa-chevron-down faq-chevron text-brand-gold text-xs shrink-0 mt-1"></i>
                    </button>
                    <div id="faq-answer-${i}" class="faq-answer">
                        <p class="text-xs text-slate-600 font-light leading-relaxed px-6 pb-6">${item.a}</p>
                    </div>
                `;
                container.appendChild(div);
            });
        }

        function toggleFAQ(i) {
            const answer = document.getElementById(`faq-answer-${i}`);
            const chevron = document.getElementById(`faq-chevron-${i}`);
            const isOpen = answer.classList.contains('open');
            // Close all
            document.querySelectorAll('.faq-answer').forEach(a => a.classList.remove('open'));
            document.querySelectorAll('.faq-chevron').forEach(c => c.classList.remove('rotated'));
            // Open clicked if was closed
            if (!isOpen) {
                answer.classList.add('open');
                chevron.classList.add('rotated');
            }
        }

        // ── Init ─────────────────────────────────────────────────
        window.onload = function() {
            runQuoteCalculation();
            buildFAQ();
        };