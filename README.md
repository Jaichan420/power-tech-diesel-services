# Power Tech Diesel Services

Responsive React and Vite website for Power Tech Diesel Services in Chennai. The site introduces generator oil servicing, planned maintenance, and AMC enquiries, with a quote form connected to a local Flask API and an optional customer-reviewed WhatsApp message.

## Run locally

### Frontend

1. Install Node.js (LTS) and npm.
2. Open this folder in VS Code and open **Terminal > New Terminal**.
3. Run `npm install` once, then `npm run dev`.
4. Open the local URL printed by Vite, usually `http://localhost:5173`.

Create a production build with `npm run build`; preview it using `npm run preview`.

### Backend

1. Open a second terminal in the project root.
2. In the `backend` folder, install dependencies with `pip install -r requirements.txt`.
3. Start the API with `python app.py` from the `backend` folder.
4. The API will run on `http://127.0.0.1:5000`.

The backend exposes a health endpoint at `/health` and a JSON callback-enquiry endpoint at `/api/enquiry`. The form uses `http://127.0.0.1:5000` by default. To use another API host in local development, set `VITE_API_BASE_URL` in a local `.env.local` file and restart Vite. The local API allows browser requests from `http://localhost:5173`.

## Business details

Contact details, including the business WhatsApp number, phone, email, address, and service area, are configured in `src/config/business.js`. Use an international country code and digits for `whatsapp`, without a `+` or spaces. The enquiry draft opens addressed to the configured number.

## Enquiry form test

With the Flask backend and Vite running, open the site at `http://localhost:5173` and submit the callback form empty to see required-field messages. Complete the required name, contact number, business type, service, and location fields; generator brand is optional. The form sends JSON to `/api/enquiry` and shows success only when the backend confirms the enquiry was saved; failed requests show an error. The optional generator brand is included in the saved message text for compatibility with the existing backend. The separate **Enquire on WhatsApp** button opens a prefilled draft, which the customer must review and manually send. Submitting the callback form does not send a WhatsApp message.

The home page includes the serviced engine brands and maintenance materials. Brand names are provided for service reference only and do not imply manufacturer authorization or affiliation. Parts availability and compatibility depend on the generator model.

## Images

The hero, industry, and gallery photos are illustrative remote images, not records of completed Power Tech projects. Replace the image URLs in `src/config/business.js` for industry and gallery images, and in `src/App.jsx` for hero and about images. For a self-contained deployment, add genuine optimized company photos to `public/images/` and use local paths such as `/images/generator-service.webp`. Add informative alt text when changing the images.

## Deployment

For a low-cost static deployment, connect this repository to Cloudflare Pages or Netlify and use `npm run build` as the build command and `dist` as the output directory. Both offer free tiers suitable for a small business site; check current provider limits and domain pricing. Configure contact details before publishing and test the WhatsApp link on mobile and desktop.
