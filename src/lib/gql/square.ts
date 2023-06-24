import { PUBLIC_SQUARE_APP_ID, PUBLIC_SQUARE_CALLBACK_URL } from '$env/static/public';

// The URL where the Point of Sale app will send the transaction results.
const callbackUrl = PUBLIC_SQUARE_CALLBACK_URL;

// Your application ID
const applicationId = PUBLIC_SQUARE_APP_ID;

// The total and currency code should come from your transaction flow.
// For now, we are hardcoding them.
var transactionTotal = '{TRANSACTION TOTAL}';
var currencyCode = 'USD';

// The version of the Point of Sale SDK that you are using.
var sdkVersion = 'v2.0';

const getPosUrl = (transactionTotal: number) => {
	// Configure the allowable tender types
	const tenderTypes =
		'com.squareup.pos.TENDER_CARD, \
    com.squareup.pos.TENDER_CARD_ON_FILE, \
    com.squareup.pos.TENDER_CASH, \
    com.squareup.pos.TENDER_OTHER';

	const posUrl =
		'intent:#Intent;' +
		'action=com.squareup.pos.action.CHARGE;' +
		'package=com.squareup;' +
		'S.com.squareup.pos.WEB_CALLBACK_URI=' +
		callbackUrl +
		';' +
		'S.com.squareup.pos.CLIENT_ID=' +
		applicationId +
		';' +
		'S.com.squareup.pos.API_VERSION=' +
		sdkVersion +
		';' +
		'i.com.squareup.pos.TOTAL_AMOUNT=' +
		transactionTotal +
		';' +
		'S.com.squareup.pos.CURRENCY_CODE=' +
		currencyCode +
		';' +
		'S.com.squareup.pos.TENDER_TYPES=' +
		tenderTypes +
		';' +
		'end';

	return posUrl;
};

export default getPosUrl;
