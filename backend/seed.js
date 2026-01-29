const mongoose = require('mongoose');
const Deal = require('./models/Deal');
require('dotenv').config();

// Sample deals data
const sampleDeals = [
  {
    title: 'AWS Activate - $5000 Credits',
    description: 'Get up to $5,000 in AWS credits for cloud hosting, storage, and computing power. Perfect for startups building scalable applications.',
    partnerName: 'Amazon Web Services',
    partnerLogo: 'https://logo.clearbit.com/aws.amazon.com',
    category: 'cloud-services',
    discountValue: '$5,000 in credits',
    originalPrice: '$5,000',
    isLocked: true,
    eligibilityCriteria: 'Early-stage startup with verified founder status',
    requiredVerification: true,
    termsAndConditions: 'Credits valid for 2 years. Cannot be transferred.',
    claimLimit: 100
  },
  {
    title: 'Mailchimp - 50% Off for 6 Months',
    description: 'Build your email marketing campaigns with 50% off Mailchimp Standard plan for the first 6 months.',
    partnerName: 'Mailchimp',
    partnerLogo: 'https://logo.clearbit.com/mailchimp.com',
    category: 'marketing',
    discountValue: '50% off for 6 months',
    originalPrice: '$20/month',
    isLocked: false,
    eligibilityCriteria: 'Available to all users',
    requiredVerification: false,
    claimLimit: 500
  },
  {
    title: 'Notion - Free Team Plan',
    description: 'Get Notion Team plan free for 3 months. Perfect for collaborative workspaces and documentation.',
    partnerName: 'Notion',
    partnerLogo: 'https://logo.clearbit.com/notion.so',
    category: 'productivity',
    discountValue: '3 months free',
    originalPrice: '$8/user/month',
    isLocked: false,
    eligibilityCriteria: 'Available to all users',
    requiredVerification: false
  },
  {
    title: 'Google Cloud - $300 Credits',
    description: 'New users get $300 in free credits to spend on Google Cloud Platform services over 90 days.',
    partnerName: 'Google Cloud',
    partnerLogo: 'https://logo.clearbit.com/cloud.google.com',
    category: 'cloud-services',
    discountValue: '$300 in credits',
    originalPrice: '$300',
    isLocked: false,
    eligibilityCriteria: 'Available to all users',
    requiredVerification: false
  },
  {
    title: 'Figma Professional - 1 Year Free',
    description: 'Design and prototype with Figma Professional plan completely free for 1 year for early-stage startups.',
    partnerName: 'Figma',
    partnerLogo: 'https://logo.clearbit.com/figma.com',
    category: 'design',
    discountValue: '1 year free',
    originalPrice: '$12/editor/month',
    isLocked: true,
    eligibilityCriteria: 'Verified startup founders only',
    requiredVerification: true,
    claimLimit: 200
  },
  {
    title: 'Stripe - No Fees on First $20k',
    description: 'Waived processing fees on your first $20,000 in transactions. Start accepting payments immediately.',
    partnerName: 'Stripe',
    partnerLogo: 'https://logo.clearbit.com/stripe.com',
    category: 'other',
    discountValue: 'Waived fees on $20k',
    originalPrice: '~$580 in fees',
    isLocked: true,
    eligibilityCriteria: 'Verified early-stage startups',
    requiredVerification: true,
    claimLimit: 150
  },
  {
    title: 'GitHub Team - Free for 1 Year',
    description: 'Access advanced collaboration features with GitHub Team plan free for one year.',
    partnerName: 'GitHub',
    partnerLogo: 'https://logo.clearbit.com/github.com',
    category: 'development',
    discountValue: '1 year free',
    originalPrice: '$4/user/month',
    isLocked: false,
    eligibilityCriteria: 'Available to all users',
    requiredVerification: false
  },
  {
    title: 'Mixpanel - 1 Million Events Free',
    description: 'Track up to 1 million events per month for free. Get deep product analytics insights.',
    partnerName: 'Mixpanel',
    partnerLogo: 'https://logo.clearbit.com/mixpanel.com',
    category: 'analytics',
    discountValue: '1M events/month free',
    originalPrice: '$25/month',
    isLocked: false,
    eligibilityCriteria: 'Available to all users',
    requiredVerification: false
  },
  {
    title: 'Slack Business+ - 3 Months Free',
    description: 'Upgrade your team communication with Slack Business+ plan free for 3 months.',
    partnerName: 'Slack',
    partnerLogo: 'https://logo.clearbit.com/slack.com',
    category: 'communication',
    discountValue: '3 months free',
    originalPrice: '$12.50/user/month',
    isLocked: true,
    eligibilityCriteria: 'Verified startup teams',
    requiredVerification: true,
    claimLimit: 300
  },
  {
    title: 'HubSpot - 90% Off Starter Plan',
    description: 'Build your marketing and sales pipeline with 90% off HubSpot Starter for the first year.',
    partnerName: 'HubSpot',
    partnerLogo: 'https://logo.clearbit.com/hubspot.com',
    category: 'marketing',
    discountValue: '90% off for 1 year',
    originalPrice: '$45/month',
    isLocked: false,
    eligibilityCriteria: 'Available to all users',
    requiredVerification: false
  },
  {
    title: 'MongoDB Atlas - $500 Credits',
    description: 'Get $500 in credits for MongoDB Atlas cloud database. Perfect for scaling your application data.',
    partnerName: 'MongoDB',
    partnerLogo: 'https://logo.clearbit.com/mongodb.com',
    category: 'cloud-services',
    discountValue: '$500 in credits',
    originalPrice: '$500',
    isLocked: false,
    eligibilityCriteria: 'Available to all users',
    requiredVerification: false,
    claimLimit: 250
  },
  {
    title: 'Canva Pro - 1 Year Free',
    description: 'Create stunning graphics and marketing materials with Canva Pro free for 12 months.',
    partnerName: 'Canva',
    partnerLogo: 'https://logo.clearbit.com/canva.com',
    category: 'design',
    discountValue: '1 year free',
    originalPrice: '$119.99/year',
    isLocked: false,
    eligibilityCriteria: 'Available to all users',
    requiredVerification: false,
    claimLimit: 400
  },
  {
    title: 'Airtable - 6 Months Free Pro',
    description: 'Organize everything with Airtable Pro plan free for 6 months. Build custom databases and workflows.',
    partnerName: 'Airtable',
    partnerLogo: 'https://logo.clearbit.com/airtable.com',
    category: 'productivity',
    discountValue: '6 months free',
    originalPrice: '$20/user/month',
    isLocked: false,
    eligibilityCriteria: 'Available to all users',
    requiredVerification: false,
    claimLimit: 300
  },
  {
    title: 'Zoom Business - 3 Months Free',
    description: 'Host unlimited meetings with Zoom Business plan free for 3 months. Up to 300 participants.',
    partnerName: 'Zoom',
    partnerLogo: 'https://logo.clearbit.com/zoom.us',
    category: 'communication',
    discountValue: '3 months free',
    originalPrice: '$19.99/user/month',
    isLocked: false,
    eligibilityCriteria: 'Available to all users',
    requiredVerification: false,
    claimLimit: 350
  },
  {
    title: 'Twilio - $500 Credits',
    description: 'Build communication features with $500 in Twilio credits for SMS, voice, and video APIs.',
    partnerName: 'Twilio',
    partnerLogo: 'https://logo.clearbit.com/twilio.com',
    category: 'development',
    discountValue: '$500 in credits',
    originalPrice: '$500',
    isLocked: true,
    eligibilityCriteria: 'Verified startup developers',
    requiredVerification: true,
    claimLimit: 200
  },
  {
    title: 'Intercom - 95% Off for 1 Year',
    description: 'Engage customers with live chat and support. Get 95% off Intercom Starter for the first year.',
    partnerName: 'Intercom',
    partnerLogo: 'https://logo.clearbit.com/intercom.com',
    category: 'communication',
    discountValue: '95% off for 1 year',
    originalPrice: '$74/month',
    isLocked: true,
    eligibilityCriteria: 'Verified early-stage startups',
    requiredVerification: true,
    claimLimit: 150
  },
  {
    title: 'Webflow - 6 Months CMS Plan Free',
    description: 'Build and launch professional websites with Webflow CMS plan free for 6 months.',
    partnerName: 'Webflow',
    partnerLogo: 'https://logo.clearbit.com/webflow.com',
    category: 'development',
    discountValue: '6 months free',
    originalPrice: '$29/month',
    isLocked: false,
    eligibilityCriteria: 'Available to all users',
    requiredVerification: false,
    claimLimit: 250
  },
  {
    title: 'Segment - $50,000 Credits',
    description: 'Collect and route customer data with $50,000 in Segment credits. Premium data infrastructure.',
    partnerName: 'Segment',
    partnerLogo: 'https://logo.clearbit.com/segment.com',
    category: 'analytics',
    discountValue: '$50,000 in credits',
    originalPrice: '$50,000',
    isLocked: true,
    eligibilityCriteria: 'Series A+ funded startups',
    requiredVerification: true,
    claimLimit: 50
  },
  {
    title: 'Asana Business - 50% Off',
    description: 'Manage projects and team workflows with 50% off Asana Business for the first year.',
    partnerName: 'Asana',
    partnerLogo: 'https://logo.clearbit.com/asana.com',
    category: 'productivity',
    discountValue: '50% off for 1 year',
    originalPrice: '$24.99/user/month',
    isLocked: false,
    eligibilityCriteria: 'Available to all users',
    requiredVerification: false,
    claimLimit: 300
  },
  {
    title: 'SendGrid - $1000 Credits',
    description: 'Send transactional and marketing emails with $1000 in SendGrid credits. Up to 100k emails.',
    partnerName: 'SendGrid',
    partnerLogo: 'https://logo.clearbit.com/sendgrid.com',
    category: 'marketing',
    discountValue: '$1,000 in credits',
    originalPrice: '$1,000',
    isLocked: false,
    eligibilityCriteria: 'Available to all users',
    requiredVerification: false,
    claimLimit: 400
  },
  {
    title: 'DigitalOcean - $200 Credits',
    description: 'Deploy and scale applications with $200 in DigitalOcean credits valid for 60 days.',
    partnerName: 'DigitalOcean',
    partnerLogo: 'https://logo.clearbit.com/digitalocean.com',
    category: 'cloud-services',
    discountValue: '$200 in credits',
    originalPrice: '$200',
    isLocked: false,
    eligibilityCriteria: 'Available to all users',
    requiredVerification: false,
    claimLimit: 500
  },
  {
    title: 'Zendesk - 6 Months Free',
    description: 'Provide excellent customer support with Zendesk Suite Team plan free for 6 months.',
    partnerName: 'Zendesk',
    partnerLogo: 'https://logo.clearbit.com/zendesk.com',
    category: 'communication',
    discountValue: '6 months free',
    originalPrice: '$49/user/month',
    isLocked: true,
    eligibilityCriteria: 'Verified startup teams',
    requiredVerification: true,
    claimLimit: 200
  },
  {
    title: 'Adobe Creative Cloud - 60% Off',
    description: 'Access all Adobe apps including Photoshop, Illustrator, and Premiere Pro with 60% off for 1 year.',
    partnerName: 'Adobe',
    partnerLogo: 'https://logo.clearbit.com/adobe.com',
    category: 'design',
    discountValue: '60% off for 1 year',
    originalPrice: '$54.99/month',
    isLocked: true,
    eligibilityCriteria: 'Verified creative startups',
    requiredVerification: true,
    claimLimit: 100
  },
  {
    title: 'Vercel Pro - 1 Year Free',
    description: 'Deploy and host your frontend applications with Vercel Pro plan free for 12 months.',
    partnerName: 'Vercel',
    partnerLogo: 'https://logo.clearbit.com/vercel.com',
    category: 'development',
    discountValue: '1 year free',
    originalPrice: '$20/month',
    isLocked: false,
    eligibilityCriteria: 'Available to all users',
    requiredVerification: false,
    claimLimit: 350
  },
  {
    title: 'Typeform - 50% Off Pro Plan',
    description: 'Create beautiful forms and surveys with 50% off Typeform Pro for the first year.',
    partnerName: 'Typeform',
    partnerLogo: 'https://logo.clearbit.com/typeform.com',
    category: 'productivity',
    discountValue: '50% off for 1 year',
    originalPrice: '$35/month',
    isLocked: false,
    eligibilityCriteria: 'Available to all users',
    requiredVerification: false,
    claimLimit: 300
  }
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');

    // Clear existing deals
    await Deal.deleteMany({});
    console.log('Existing deals cleared');

    // Insert sample deals
    await Deal.insertMany(sampleDeals);
    console.log('Sample deals inserted successfully');

    mongoose.connection.close();
    console.log('Database seeding completed');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
