import { defineAsyncComponent } from "vue";

// Lazy load all PopupContent components - they're only shown when modal opens
// This significantly reduces initial bundle size and critical path latency
export default {
  PopupContentAboutUs: defineAsyncComponent(() =>
    import("./PopupContentAboutUs.vue")
  ),
  PopupContentHistory: defineAsyncComponent(() =>
    import("./PopupContentHistory.vue")
  ),
  PopupContentOurGoal: defineAsyncComponent(() =>
    import("./PopupContentOurGoal.vue")
  ),
  PopupContentFacts: defineAsyncComponent(() =>
    import("./PopupContentFacts.vue")
  ),
  PopupContentFlatMove: defineAsyncComponent(() =>
    import("./PopupContentFlatMove.vue")
  ),
  PopupContentOfficeMove: defineAsyncComponent(() =>
    import("./PopupContentOfficeMove.vue")
  ),
  PopupContentStuffMove: defineAsyncComponent(() =>
    import("./PopupContentStuffMove.vue")
  ),
  PopupContentSpecialists: defineAsyncComponent(() =>
    import("./PopupContentSpecialists.vue")
  ),
  PopupContentPayment: defineAsyncComponent(() =>
    import("./PopupContentPayment.vue")
  ),
  PopupContentSpecialOffers: defineAsyncComponent(() =>
    import("./PopupContentSpecialOffers.vue")
  ),
  PopupContentAuto: defineAsyncComponent(() =>
    import("./PopupContentAuto.vue")
  ),
  PopupContentPackage: defineAsyncComponent(() =>
    import("./PopupContentPackage.vue")
  ),
  PopupContentContacts: defineAsyncComponent(() =>
    import("./PopupContentContacts.vue")
  ),
  PopupContentJobs: defineAsyncComponent(() =>
    import("./PopupContentJobs.vue")
  ),
  PopupContentFeedback: defineAsyncComponent(() =>
    import("./PopupContentFeedback.vue")
  ),
  PopupContentPartners: defineAsyncComponent(() =>
    import("./PopupContentPartners.vue")
  ),
};
