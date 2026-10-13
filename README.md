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

### Email notifications

Email notifications use the Resend API. The backend reads `RESEND_API_KEY`, `ENQUIRY_NOTIFICATION_EMAIL`, and `EMAIL_FROM` from its environment. `EMAIL_FROM` must be a sender verified with the email provider. The example values in `.env.example` are placeholders; no live email provider is configured. If these variables are absent, enquiries are still saved and a generic configuration warning is logged. If delivery fails after a save, the enquiry remains successful.

Set these variables in the environment of the backend process when ready to configure a provider. Never put provider credentials in React or any `VITE_` variable. SQLite is for local development only; the backend refuses a SQLite database URL when running with `VERCEL` or `FLASK_ENV=production`.

## Business details

Contact details, including the business WhatsApp number, phone, email, address, and service area, are configured in `src/config/business.js`. Use an international country code and digits for `whatsapp`, without a `+` or spaces. The enquiry draft opens addressed to the configured number.

## Customer directory

The `/customers` page and homepage preview use `src/config/customers.js`. Each category card opens its directory, and search matches approved organization names across all categories. Add organization names to a category only after they are explicitly approved for public display. Do not add individual residential customer names, contact details, or addresses. The source customer-list PDF is excluded from Git and is not copied into the Vite production output.

## Enquiry form test

With the Flask backend and Vite running, open the site at `http://localhost:5173` and submit the callback form empty to see required-field messages. Complete the required name, contact number, business type, service, and location fields; generator brand is optional. The form sends JSON to `/api/enquiry` and shows success only when the backend confirms the enquiry was saved; failed requests show an error. The optional generator brand is included in the saved message text for compatibility with the existing backend. The separate **Enquire on WhatsApp** button opens a prefilled draft, which the customer must review and manually send. Submitting the callback form does not send a WhatsApp message.

For an API-only local check from PowerShell, start the backend as above and in another terminal run:

```powershell
$body = @{
  name = "Fictional Test Customer"
  phone = "+91 90000 12345"
  businessType = "Industry/Factory"
  location = "Test Area, Chennai"
  generatorBrand = "Cummins"
  service = "Diesel Generator Servicing"
  capacity = "125"
  message = "Fictional API verification only."
} | ConvertTo-Json
Invoke-RestMethod -Method Post -Uri "http://127.0.0.1:5000/api/enquiry" -ContentType "application/json" -Body $body
```

This creates a real local test enquiry in the SQLite database; remove that test entry from the database after verifying it. Do not use real customer information for testing.

The home page's Engine Experience cards use local images from `public/engines/` (`cummins.webp`, `ashok-leyland.jpg`, `kirloskar.webp`, `ruston.avif`, and `MWM-TCG-2032.webp`). Brand names are provided for service reference only and do not imply manufacturer authorization or affiliation. Parts availability and compatibility depend on the generator model.

## Images

The hero, industry, and gallery photos are illustrative remote images, not records of completed Power Tech projects. Replace the image URLs in `src/config/business.js` for industry and gallery images, and in `src/App.jsx` for hero and about images. For a self-contained deployment, add genuine optimized company photos to `public/images/` and use local paths such as `/images/generator-service.webp`. Add informative alt text when changing the images.

## Deployment

For a low-cost static deployment, connect this repository to Cloudflare Pages or Netlify and use `npm run build` as the build command and `dist` as the output directory. Both offer free tiers suitable for a small business site; check current provider limits and domain pricing. Configure contact details before publishing and test the WhatsApp link on mobile and desktop.
