# NourishCo Case Study Context

## 1. Assignment Brief

NourishCo is a global FMCG enterprise that owns multiple brands across food, beverages, personal care, and sustainable packaging:

- PureSip Beverages - Premium bottled water & flavored drinks.
- Harvest Bites - Snacks & healthy food, including granola bars and organic chips.
- DailyGlow - Personal care, including skincare, haircare, and beauty.
- QuickEats - Frozen and ready-to-eat meals.
- EcoPack - Sustainable packaging solutions.

NourishCo collaborates with thousands of suppliers for raw materials and packaging. Supplier onboarding and compliance tracking currently vary across brands, leading to approval delays, scattered document management, limited real-time compliance visibility, high manual effort, and duplicate supplier approvals across brands.

The product challenge is to define the strategy and execution approach for a centralized, multi-brand supplier onboarding and compliance platform.

## 2. Product Scope

The product should focus on supplier onboarding and compliance, not full procurement.

In scope:

- Supplier invitation
- Supplier registration
- Unified supplier profile
- Multi-brand supplier application
- Document upload
- Compliance checklist
- AI-assisted document parsing and pre-fill
- Supplier review before submission
- Compliance review workflow
- Document expiry and renewal tracking
- Role-based permissions
- Centralized visibility into supplier status and risk

Out of scope for MVP:

- Full sourcing workflows
- Purchase orders
- Invoice processing
- Payments
- Spend analytics
- ERP replacement
- Full contract lifecycle management
- Fully automated supplier approval

## 3. Stakeholders

Stakeholders are everyone who has an interest in, influence over, or is impacted by the product.

- Suppliers / vendors
- Procurement / supplier management teams
- Compliance / QA teams
- Finance teams
- Legal teams
- Brand or category owners
- Central operations
- Leadership
- IT / admin teams
- Audit / risk teams

Simple distinction:

> Stakeholders care about the outcome. User segments interact with the product.

## 4. User Segments

User segments are specific groups of actual users with distinct goals, workflows, and product needs.

### New Suppliers

Need to understand requirements, submit company information and documents, track status, and resolve clarifications.

### Existing Suppliers

Need to reuse an existing verified profile, apply to additional brands, update documents, and complete only delta requirements.

### Procurement Managers

Need to invite suppliers, track progress, understand blockers, coordinate reviews, and reduce manual follow-ups.

### Compliance / QA Reviewers

Need to verify submitted documents, identify risks, approve or reject documents, and maintain audit-ready records.

### Finance Reviewers

Need to verify tax, bank, and payment-readiness information.

### Legal Reviewers

Need to track supplier agreements, NDAs, deviations, and legal approval status.

### Admin / Central Operations

Need to configure supplier types, document rules, workflows, permissions, and escalation logic.

## 5. Compliance Pain Points

The compliance pain point is that NourishCo needs to ensure every supplier meets legal, quality, safety, financial, and internal policy standards before approval, but the process is manual, fragmented, and hard to audit.

Key pain points:

- Incomplete or incorrect documents
- Manual document verification
- No single source of truth
- Limited visibility into supplier risk
- Slow cross-functional approvals
- Poor audit readiness
- Document expiry and renewal tracking
- Different requirements by supplier type, brand, geography, and category

Problem statement:

> Compliance teams need a reliable way to verify supplier eligibility, track document completeness, identify risk, and maintain audit-ready approval records, but today the process is manual, scattered, and dependent on repeated follow-ups.

## 6. Market And Competitor Framing

The relevant market is not broad procurement alone. The product sits inside supplier onboarding, supplier management, vendor management, and compliance workflows.

Recommended framing:

> The broader vendor management software market is useful context, but NourishCo's direct opportunity is narrower: supplier onboarding, supplier information management, document compliance, and supplier risk workflows.

Market references discussed:

- Supplier Management Market: approximately USD 734.53M in 2026, growing to approximately USD 1.55B by 2034.
- Vendor Management Software Market: approximately USD 11.47B to USD 13.62B in 2026, depending on source methodology.
- Vendor Onboarding & Information Management module: 31.4% of the Vendor Management Systems market, approximately USD 3.61B from a USD 11.51B market.
- Compliance Management Software Market: much broader, approximately USD 38.36B in 2026, but too broad to use as the core TAM.

Important caveat:

> Public reports do not provide market share by our strategic 2x2 quadrants. Use the 2x2 as qualitative competitor positioning, and use module split as the closest available market proxy.

## 7. 2x2 Competitive Positioning

Recommended chart title:

> Supplier Onboarding & Compliance: Competitive Positioning

X-axis:

> Generic supplier onboarding -> Compliance-depth onboarding

Y-axis:

> Narrow point solution -> End-to-end onboarding workflow

Quadrants:

- Enterprise onboarding workflow platforms: SAP Ariba, Coupa, Ivalua, JAGGAER, GEP, Oracle, Zycus, Zip (SUP), Levelpath (SUP), ORO Labs (SUP), Tonkean (SUP)
- Onboarding + compliance platforms: TraceGains, Trustwell / FoodLogiQ, HICX, Certa (SUP), NourishCo target
- Finance / legacy vendor workflows: Basware, Medius, Esker, Tradeshift, Proactis, SynerTrade, SAP SRM, Oracle PeopleSoft / EBS
- Specialist compliance modules: SafetyChain, Specright, Prewave (SUP)

NourishCo should sit center-right:

> More compliance-aware than generic onboarding tools, broader than a pure compliance checker, but not as broad or mature as enterprise source-to-pay suites or deep compliance platforms.

## 8. Key User And Business Insights

### User Insights

- Suppliers often do not know which documents are required, what format is acceptable, or why their submission is blocked.
- Existing suppliers do not want to repeat onboarding for every brand.
- Procurement teams own the relationship but often lack visibility into why onboarding is delayed.
- Compliance reviewers spend too much time manually checking documents, expiry dates, mismatches, and missing information.
- Finance needs verified tax and bank information before activation.
- Legal can become a bottleneck when agreements and deviations are handled separately.
- Admins need configurable rules because requirements vary by brand, category, geography, and risk level.

### Business Insights

- Supplier onboarding is a growth bottleneck.
- Compliance risk increases with supplier scale.
- The process is cross-functional by nature.
- Manual document review is costly and error-prone.
- Visibility is often worse than the actual work.
- Audit readiness is a hidden business requirement.
- One-size-fits-all onboarding does not work.
- AI is valuable when it reduces review effort, not when it replaces judgment.

Slide-ready summary:

> Supplier onboarding is not just a form submission problem. It is a cross-functional compliance workflow where suppliers need clarity, internal teams need visibility, and the business needs faster approvals without increasing risk.

## 9. Assumptions, Dependencies, And Unknowns

### Assumptions

- NourishCo is a fictional global FMCG company.
- Supplier types include ingredients, packaging, logistics, co-manufacturing, and services.
- Current onboarding is fragmented across email, spreadsheets, shared drives, ERP forms, or disconnected tools.
- Compliance requirements vary by brand, category, geography, and supplier risk.
- AI assists reviewers but does not make final compliance decisions.
- MVP focuses on supplier onboarding and compliance, not full procurement.

### Dependencies

- Document requirements by supplier type and brand
- Existing ERP or vendor master systems
- Document formats and data quality
- Internal approval ownership
- Security and privacy requirements
- Audit and retention policies
- Supplier adoption
- Configurable workflow rules

### Unknowns

- Actual supplier volume
- Current onboarding cycle time
- Most common delay reasons
- Required compliance documents
- Regulatory and geographic scope
- Existing technology stack
- Supplier digital maturity
- Approval SLAs
- Risk appetite
- AI accuracy tolerance

## 10. PRD: Problem Statement, Goals, And Non-Goals

### Problem Statement

NourishCo needs a faster and more reliable way to onboard suppliers while ensuring that every supplier meets required compliance standards before approval. Today, supplier onboarding is likely fragmented across emails, spreadsheets, shared drives, and manual reviews. This creates delays, repeated follow-ups, unclear ownership, inconsistent compliance checks, and poor audit visibility.

Core problem:

> Suppliers do not have a clear, guided way to submit the right information and documents, while internal teams do not have a single workflow to verify documents, resolve exceptions, track approvals, and maintain an audit-ready supplier record.

### Goals

- Reduce onboarding time
- Improve first-time submission quality
- Increase compliance confidence
- Improve internal visibility
- Reduce manual review effort
- Strengthen audit readiness
- Support scalable supplier growth across brands

### Non-Goals

- Full procurement suite
- Invoice and payment processing
- ERP replacement
- Fully automated supplier approval
- Broad ESG/regulatory intelligence platform
- Full contract lifecycle management

## 11. PRD: Key Workflows And User Journeys

Core workflow:

1. Supplier invitation
2. Basic business profile
3. Brand/category/region context
4. Document upload
5. AI document parsing and pre-fill
6. Supplier review and confirmation
7. Compliance review
8. Approval, clarification, or rejection
9. Renewal and re-verification

Supplier journey:

- Receives invite or starts application
- Enters legal business name, region, and supplier category
- Uploads available documents
- AI extracts and pre-fills profile information
- Supplier reviews every detail before submitting
- Supplier tracks application status

Procurement journey:

- Invites supplier
- Tracks progress and blockers
- Coordinates with compliance, finance, legal, and central operations
- Moves supplier toward approval

Compliance journey:

- Opens review queue
- Reviews AI flags
- Requests clarification
- Approves, rejects, or blocks supplier
- Maintains audit-ready decision history

Existing supplier journey:

- Uses verified supplier profile
- Applies to another brand
- Completes only delta requirements
- Reuses valid documents
- Updates expired or brand-specific documents

## 12. PRD: Functional Requirements

P0:

- Supplier invitation
- Supplier registration/profile
- Unified supplier identity
- Multi-brand application
- Configurable document checklist
- Document upload
- Onboarding status tracker
- Compliance review queue
- Approve/reject/request clarification actions
- Audit trail
- Role-based access control

P1:

- AI document pre-check
- Expiry and renewal tracking
- Existing supplier reuse
- Delta checklist for additional brands
- SLA and escalation tracking
- Internal comments and handoffs
- Finance readiness checklist
- Legal document status
- Admin rule configuration
- Supplier search and filters

P2:

- ERP/vendor master export
- Advanced analytics dashboard
- Deeper legal/finance automation
- Advanced ESG/regulatory modules

## 13. PRD: Non-Functional Requirements

- Security
- Privacy
- Auditability
- Reliability
- Performance
- Scalability
- Configurability
- Usability
- Accessibility
- Data integrity
- Integration readiness
- AI transparency
- Compliance resilience

Key principle:

> The system should never auto-approve high-risk suppliers solely based on AI output.

## 14. PRD: AI-Assisted Workflows And Automations

AI-assisted workflows:

- Document extraction
- Completeness check
- Document quality check
- Mismatch detection
- Expiry detection
- Risk summary
- Clarification drafting
- Reviewer prioritization
- Duplicate detection
- Renewal intelligence

Automations:

- Checklist generation based on supplier type, category, region, and brand
- Missing document reminders
- Clarification requests
- SLA escalations
- Expiry reminders
- Status routing
- High-risk flag routing
- Low-confidence AI result routing
- Final approval readiness alerts

Human-in-the-loop rules:

- AI cannot fully approve a supplier.
- AI flags must show reason and extracted evidence.
- Low-confidence results require manual review.
- High-risk suppliers cannot bypass compliance review.
- Reviewers can override AI with reason.
- Every AI-assisted decision is logged.

## 15. PRD: MVP Scope And Prioritization

MVP scope:

- Supplier invitation
- Basic business profile
- Supplier passport / reusable profile
- Multi-brand application
- Document upload
- Configurable checklist
- AI document pre-check
- Supplier review before submit
- Compliance review queue
- Approval/rejection/clarification workflow
- Audit trail
- Basic expiry tracking
- Procurement dashboard

MVP excludes:

- Full sourcing
- Purchase orders
- Invoice processing
- Payments
- Full ERP replacement
- Advanced ESG/regulatory modules
- Full contract lifecycle management
- Fully automated approval

Prioritization rationale:

> The MVP prioritizes the core onboarding loop and the highest-friction compliance tasks. It should prove that suppliers can move from application to compliance-ready review faster, with fewer errors and less manual coordination.

## 16. PRD: Success Metrics

- Median onboarding cycle time
- First-time document completion rate
- Manual follow-ups per supplier
- Compliance review turnaround time
- Supplier correction turnaround time
- Approval SLA adherence
- Document exception rate
- AI flag precision
- Audit completeness
- Supplier drop-off rate
- Internal user satisfaction
- Duplicate onboarding reduction
- Reused document rate
- Existing supplier application time
- Delta-only completion rate
- Cross-brand approval cycle time

Suggested directional MVP targets:

- 30-40% reduction in onboarding cycle time
- 25% improvement in first-time complete submissions
- 40-50% reduction in manual follow-ups
- More than 85% cases completed within SLA
- More than 95% approved suppliers with full audit trail
- More than 80% reviewer-confirmed useful AI flags

## 17. PRD: Stress Cases, Edge Cases, And Scalability

Stress cases:

- Large supplier volume during brand expansion
- Many suppliers uploading documents at once
- Multiple brands using different approval workflows
- Supplier applies across several brands simultaneously
- Compliance rules change by geography or category
- AI extraction confidence is low
- Duplicate supplier records exist
- Supplier changes bank or tax details after approval
- Document expires during review
- Reviewers disagree

Expected handling:

- Queue-based AI processing
- Human review for low-confidence or high-risk cases
- Duplicate detection
- Delta-based brand requirements
- Audit logs for every status and decision
- Escalation for overdue review tasks
- Version history for document changes

Scalability considerations:

- Thousands of suppliers
- More brands and categories over time
- More document types and compliance rules
- Region-specific workflows
- ERP and vendor master integrations
- Searchable audit history
- Configurable rule engine

## 18. Prototype Direction

Prototype should be web-first, not mobile-first.

Current supplier-facing landing concept:

Headline:

> Bring your business to NourishCo

Subtext:

> Create one supplier profile, apply across NourishCo brands, and track your compliance status in one place.

Primary CTA:

> Start application

Secondary CTA:

> Continue existing application

Profile verification section:

> Start with profile verification

Options:

- Google
- LinkedIn
- Apple

Document upload screen:

Title:

> Upload your business documents

Subtext:

> Upload the documents you already have. We'll read them, pre-fill your profile, and show anything missing based on your brands, category, and region.

Upload categories:

- Business & tax documents
- Compliance licenses
- Quality certifications
- Financial verification

Bottom help strip:

> We'll help with

- Extracting business and tax details
- Finding expired or missing documents
- Checking name and address mismatches
- Preparing a compliance review summary

Prototype flow:

1. Welcome
2. Business basics
3. Documents
4. Review & submit
5. Submitted status

## 19. Collaboration Preferences

- Do not blindly agree with everything I say.
- Ask clarifying questions when the request, scope, or decision is ambiguous.
