"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestRoute = void 0;
const express_1 = require("express");
const blueprint_service_1 = require("./services/blueprint.service");
const router = (0, express_1.Router)();
exports.TestRoute = router;
const blueprintService = blueprint_service_1.BlueprintService.getInstance();
const webinarContent = `
  <p>Thanks for starting your journey with us! As with every new path, we know it can be difficult to navigate at first.</p>
  <p>That's why we'd like to invite you to join a FREE webinar this Friday, in which one of our leading experts will show you some cool tips & tricks for our flagship feature, as well as answer any questions you may have.</p>
  <p>We look forward to meeting you there!</p>
`;
router.get('/test', async (req, res) => {
    await blueprintService.loadBlueprints();
    const emailHtml = blueprintService.render('emails.welcome_email', {
        companyName: 'Synergy Hub',
        headline: 'Get expert advice and answers in our free webinar',
        customerName: 'Alex Carter',
        mainContentHtml: webinarContent,
        ctaButtonText: 'Reserve my seat',
        actionUrl: 'https://synergyhub.com/webinar-signup',
        unsubscribeUrl: 'https://synergyhub.com/unsubscribe?user=123'
    });
    return res.send(emailHtml);
});
