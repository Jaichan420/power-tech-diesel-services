import json
import logging
import os
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen


logger = logging.getLogger(__name__)
RESEND_API_URL = 'https://api.resend.com/emails'


def send_enquiry_notification(enquiry, generator_brand=''):
    api_key = os.environ.get('RESEND_API_KEY')
    recipient = os.environ.get('ENQUIRY_NOTIFICATION_EMAIL')
    sender = os.environ.get('EMAIL_FROM')
    if not api_key or not recipient or not sender:
        logger.warning("Enquiry email notification is not configured.")
        return False

    text = '\n'.join((
        f'Enquiry ID: {enquiry.id}',
        f'Customer name: {enquiry.name}',
        f'Phone number: {enquiry.phone}',
        f'Location: {enquiry.location}',
        f'Generator brand: {generator_brand or "Not provided"}',
        f'Required service: {enquiry.service}',
        f'Additional message: {enquiry.message or "None provided"}',
    ))
    payload = json.dumps({
        'from': sender,
        'to': [recipient],
        'subject': f'New website enquiry #{enquiry.id}',
        'text': text,
    }).encode('utf-8')
    request = Request(
        RESEND_API_URL,
        data=payload,
        headers={
            'Authorization': f'Bearer {api_key}',
            'Content-Type': 'application/json',
        },
        method='POST',
    )

    try:
        with urlopen(request, timeout=10) as response:
            if not 200 <= response.status < 300:
                logger.error("Enquiry email provider returned HTTP %s.", response.status)
                return False
    except HTTPError as error:
        logger.error("Enquiry email provider returned HTTP %s.", error.code)
        return False
    except (URLError, TimeoutError, OSError) as error:
        logger.error("Enquiry email delivery failed (%s).", type(error).__name__)
        return False
    except Exception as error:
        logger.error("Enquiry email delivery failed (%s).", type(error).__name__)
        return False

    return True
