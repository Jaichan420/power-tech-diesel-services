# Power Tech Diesel Services

Responsive React and Vite website for Power Tech Diesel Services in Chennai. The site introduces generator oil servicing, planned maintenance, and AMC enquiries, with a quote form that prepares a customer-reviewed WhatsApp message.

## Run locally

1. Install Node.js (LTS) and npm.
2. Open this folder in VS Code and open **Terminal > New Terminal**.
3. Run `npm install` once, then `npm run dev`.
4. Open the local URL printed by Vite, usually `http://localhost:5173`.

Create a production build with `npm run build`; preview it using `npm run preview`.

## Business details

Edit `src/config/business.js` to add the real WhatsApp number, phone number, email, and service area. Use the international country code and digits for `whatsapp`, without a `+` or spaces (for example, replace the empty value with the actual country code and number). No contact details are prefilled because they have not been provided. Until a valid WhatsApp number is configured, the quote form explains that the WhatsApp action is unavailable.

## Enquiry form test

Submit the quote form empty to see required-field messages. Complete the required name, contact number, business type, service, and location fields to test validation. The form will then report that WhatsApp is not configured. After a real WhatsApp number is added, submit again: WhatsApp opens with the formatted enquiry for the customer to review and send. The site does not send the message or claim it has been sent automatically.

## Images

The hero, industry, and gallery photos are illustrative remote images, not records of completed Power Tech projects. Replace the image URLs in `src/config/business.js` for industry and gallery images, and in `src/App.jsx` for hero and about images. For a self-contained deployment, add genuine optimized company photos to `public/images/` and use local paths such as `/images/generator-service.webp`. Add informative alt text when changing the images.

## Deployment

For a low-cost static deployment, connect this repository to Cloudflare Pages or Netlify and use `npm run build` as the build command and `dist` as the output directory. Both offer free tiers suitable for a small business site; check current provider limits and domain pricing. Configure contact details before publishing and test the WhatsApp link on mobile and desktop.
