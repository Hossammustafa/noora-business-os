const integrations = [
  "WhatsApp", "Shopify", "WooCommerce", "Stripe", "PayPal", "Gmail", "Outlook",
  "Slack", "Discord", "Zoom", "Teams", "Notion", "Trello", "Jira",
  "Google Drive", "Dropbox", "Google Calendar", "Calendly",
  "QuickBooks", "Xero", "SAP", "Odoo", "Salesforce", "HubSpot", "Zoho",
  "Meta Ads", "Google Ads", "TikTok Ads", "Razorpay", "Paystack",
];

export function Integrations() {
  return (
    <section id="integrations" className="py-24 relative">
      <div className="container-noora">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="section-eyebrow">التكاملات</span>
          <h2 className="mt-5 text-3xl sm:text-5xl font-black tracking-tight leading-tight">
            متصلة بكل ما <span className="gradient-text">تستخدمه فعلاً</span>.
          </h2>
        </div>

        <div className="glass-card rounded-3xl p-8 sm:p-10">
          <div className="flex flex-wrap justify-center gap-3">
            {integrations.map((i) => (
              <div
                key={i}
                className="px-4 py-2.5 rounded-full border border-border/70 bg-surface/60 text-sm font-medium hover:border-primary/40 hover:text-primary transition-colors"
              >
                {i}
              </div>
            ))}
          </div>
          <div className="text-center text-sm text-muted-foreground mt-6">+ 40 تكاملاً إضافياً عبر منصة الإضافات</div>
        </div>
      </div>
    </section>
  );
}
