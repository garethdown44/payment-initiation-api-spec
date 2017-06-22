# Payment Initiation APIs


<a name="overview"></a>
## Overview
Draft Swagger specification for Payment Initiation


### Version information
*Version* : v1.0-rc4


### Contact information
*Contact* : Craig Greenhouse  
*Contact Email* : craig.greenhouse@openbanking.org.uk


### License information
*License* : open-licence  
*License URL* : https://www.openbanking.org.uk/open-licence  
*Terms of service* : https://www.openbanking.org.uk/terms


### URI scheme
*BasePath* : /open-banking  
*Schemes* : HTTPS


### Tags

* Payments : Payments endpoints


### Produces

* `application/json`




<a name="paths"></a>
## Paths

***

<a name="createpaymentsubmission"></a>
### Create a payment submission
```
POST /payment-submissions
```


#### Description
Submit a previously setup payment


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**authorization**  <br>*required*|An Authorisation Token as per https://tools.ietf.org/html/rfc6750|string|
|**Header**|**x-fapi-customer-ip-address**  <br>*optional*|The PSU's IP address if the PSU is currently logged in with the TPP.|string|
|**Header**|**x-fapi-customer-last-logged-time**  <br>*optional*|The time when the PSU last logged in with the TPP.|string|
|**Header**|**x-fapi-financial-id**  <br>*required*|The unique id of the ASPSP to which the request is issued. The unique id will be issued by OB.|string|
|**Header**|**x-fapi-interaction-id**  <br>*optional*|An RFC4122 UID used as a correlation id.|string|
|**Header**|**x-idempotency-key**  <br>*required*|Every request will be processed only once per x-idempotency-key.  The Idempotency Key will be valid for 24 hours.|string|
|**Header**|**x-jws-signature**  <br>*required*|Header containing a detached JWS signature of the body of the payload.|string|


#### Body parameter
Setup a single immediate payment

*Name* : body  
*Flags* : required


|Name|Schema|
|---|---|
|**Data**  <br>*required*|[Payment Submission](#payment-submission)|
|**Risk**  <br>*required*|[Risk](#risk)|

<a name="payment-submission"></a>
**Payment Submission**

|Name|Description|Schema|
|---|---|---|
|**Initiation**  <br>*required*|The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor.|[Initiation](#payment-submissions-post-initiation)|
|**PaymentId**  <br>*required*|OB: Unique identification as assigned by the ASPSP to uniquely identify the payment setup resource.  <br>**Length** : `1 - 40`|string|

<a name="payment-submissions-post-initiation"></a>
**Initiation**

|Name|Description|Schema|
|---|---|---|
|**CreditorAccount**  <br>*required*|Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.|[Creditor Account](#creditor-account)|
|**CreditorAgent**  <br>*required*|Financial institution servicing an account for the creditor.|[Creditor Agent](#creditor-agent)|
|**DebtorAccount**  <br>*optional*|Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.|[Debtor Account](#debtor-account)|
|**DebtorAgent**  <br>*optional*|Financial institution servicing an account for the debtor.|[DebtorAgent](#debtoragent)|
|**EndToEndIdentification**  <br>*required*|Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain. Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction. OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.  <br>**Length** : `1 - 35`|string|
|**InstructedAmount**  <br>*required*|Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain.|[InstructedAmount](#payment-submissions-post-initiation-instructedamount)|
|**InstructionIdentification**  <br>*required*|Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction. Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.  <br>**Length** : `1 - 35`|string|
|**RemittanceInformation**  <br>*optional*|Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.|[Remittance Information](#remittance-information)|

<a name="creditor-account"></a>
**Creditor Account**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|Identification assigned by an institution to identify an account. This identification is known by the account owner.  <br>**Length** : `1 - 34`|string|
|**Name**  <br>*required*|Name of the account, as assigned by the account servicing institution, in agreement with the account owner in order to provide an additional means of identification of the account. Usage: The account name is different from the account owner name. The account name is used in certain user communities to provide a means of identifying the account, in addition to the account owner's identity and the account number. ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.  <br>**Length** : `1 - 70`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BBAN, IBAN)|
|**SecondaryIdentification**  <br>*optional*|Identification assigned by an institution to identify an account. This identification is known by the account owner.  <br>**Length** : `1 - 34`|string|

<a name="creditor-agent"></a>
**Creditor Agent**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|Unique and unambiguous identification of a person.  <br>**Length** : `1 - 35`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BICFI, UKSortCode)|

<a name="debtor-account"></a>
**Debtor Account**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|Identification assigned by an institution to identify an account. This identification is known by the account owner.  <br>**Length** : `1 - 34`|string|
|**Name**  <br>*optional*|Name of the account, as assigned by the account servicing institution, in agreement with the account owner in order to provide an additional means of identification of the account. Usage: The account name is different from the account owner name. The account name is used in certain user communities to provide a means of identifying the account, in addition to the account owner's identity and the account number.  <br>**Length** : `1 - 70`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BBAN, IBAN)|
|**SecondaryIdentification**  <br>*optional*|Identification assigned by an institution to identify an account. This identification is known by the account owner.  <br>**Length** : `1 - 34`|string|

<a name="debtoragent"></a>
**DebtorAgent**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|Unique and unambiguous identification of a person.  <br>**Length** : `1 - 35`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BICFI, UKSortCode)|

<a name="payment-submissions-post-initiation-instructedamount"></a>
**InstructedAmount**

|Name|Description|Schema|
|---|---|---|
|**Amount**  <br>*required*|**Pattern** : `"^-?\\d{1,13}\\.\\d{1,5}$"`|string|
|**Currency**  <br>*required*|A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 - Codes for the representation of currencies and funds.  <br>**Pattern** : `"[A-Z]{3}"`|string|

<a name="remittance-information"></a>
**Remittance Information**

|Name|Description|Schema|
|---|---|---|
|**Reference**  <br>*optional*|Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.  Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification. OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.  <br>**Length** : `1 - 35`|string|
|**Unstructured**  <br>*optional*|Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.  <br>**Length** : `1 - 140`|string|

<a name="risk"></a>
**Risk**

|Name|Description|Schema|
|---|---|---|
|**DeliveryAddress**  <br>*optional*|Information that locates and identifies a specific address, as defined by postal services or in free format text.|[DeliveryAddress](#payment-submissions-post-deliveryaddress)|
|**MerchantCategoryCode**  <br>*optional*|Category code conforms to ISO 18245, related to the type of services or goods the merchant provides for the transaction  <br>**Length** : `3 - 4`|string|
|**MerchantCustomerIdentification**  <br>*optional*|The unique customer identifier of the PSU with the merchant.  <br>**Length** : `1 - 70`|string|
|**PaymentContextCode**  <br>*optional*|Specifies the payment context|enum (BillPayment, EcommerceGoods, EcommerceServices, Other, PersonToPerson)|

<a name="payment-submissions-post-deliveryaddress"></a>
**DeliveryAddress**

|Name|Description|Schema|
|---|---|---|
|**AddressLine**  <br>*optional*|Information that locates and identifies a specific address, as defined by postal services, that is presented in free format text.|< string > array|
|**BuildingNumber**  <br>*optional*|Number that identifies the position of a building on a street.  <br>**Length** : `1 - 16`|string|
|**Country**  <br>*required*|Nation with its own government, occupying a particular territory.  <br>**Pattern** : `"[A-Z]{2}"`|string|
|**CountrySubDivision**  <br>*optional*|Identifies a subdivision of a country, for instance state, region, county.|< string > array|
|**PostCode**  <br>*optional*|Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail  <br>**Length** : `1 - 16`|string|
|**StreetName**  <br>*optional*|Name of a street or thoroughfare  <br>**Length** : `1 - 70`|string|
|**TownName**  <br>*required*|Name of a built-up area, with defined boundaries, and a local government.  <br>**Length** : `1 - 35`|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Payment submit resource successfully created  <br>**Headers** :   <br>`x-jws-signature` (string) : Header containing a detached JWS signature of the body of the payload.  <br>`x-fapi-interaction-id` (string) : An RFC4122 UID used as a correlation id.|[Payment Submit POST 201 Response](#payment-submit-post-201-response)|
|**400**|Bad Request|No Content|
|**401**|Unauthorized|No Content|
|**403**|Forbidden|No Content|
|**429**|Too Many Requests|No Content|
|**500**|Internal Server Error|No Content|

<a name="payment-submit-post-201-response"></a>
**Payment Submit POST 201 Response**

|Name|Description|Schema|
|---|---|---|
|**CreationDateTime**  <br>*required*|Date and time at which the resource was created.|string (date-time)|
|**Links**  <br>*required*|Link URIs relevant to the payload|[Links](#payment-submissions-post-links)|
|**Meta**  <br>*required*|Meta Data Relevant to the payload|[Meta](#payment-submissions-post-meta)|
|**PaymentId**  <br>*required*|OB: Unique identification as assigned by the ASPSP to uniquely identify the payment setup resource.  <br>**Length** : `1 - 40`|string|
|**PaymentSubmissionId**  <br>*required*|OB: Unique identification as assigned by the ASPSP to uniquely identify the payment submission resource.  <br>**Length** : `1 - 40`|string|
|**Status**  <br>*optional*|Specifies the status of the payment submission resource.|enum (AcceptedSettlementCompleted, AcceptedSettlementInProcess, Pending, Rejected)|

<a name="payment-submissions-post-links"></a>
**Links**

|Name|Schema|
|---|---|
|**first**  <br>*optional*|string (uri)|
|**last**  <br>*optional*|string (uri)|
|**next**  <br>*optional*|string (uri)|
|**prev**  <br>*optional*|string (uri)|
|**self**  <br>*required*|string (uri)|

<a name="payment-submissions-post-meta"></a>
**Meta**

|Name|Schema|
|---|---|
|**total-pages**  <br>*optional*|integer (int32)|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* Payments


#### Security

|Type|Name|Scopes|
|---|---|---|
|**oauth2**|**[PSUOAuth2Security](#psuoauth2security)**|payment|


***

<a name="getpaymentsubmission"></a>
### Get a payment submission
```
GET /payment-submissions/{PaymentSubmissionId}
```


#### Description
Get payment submission


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**authorization**  <br>*required*|An Authorisation Token as per https://tools.ietf.org/html/rfc6750|string|
|**Header**|**x-fapi-customer-ip-address**  <br>*optional*|The PSU's IP address if the PSU is currently logged in with the TPP.|string|
|**Header**|**x-fapi-customer-last-logged-time**  <br>*optional*|The time when the PSU last logged in with the TPP.|string|
|**Header**|**x-fapi-financial-id**  <br>*required*|The unique id of the ASPSP to which the request is issued. The unique id will be issued by OB.|string|
|**Header**|**x-fapi-interaction-id**  <br>*optional*|An RFC4122 UID used as a correlation id.|string|
|**Path**|**PaymentSubmissionId**  <br>*required*|Unique identification as assigned by the ASPSP to uniquely identify the payment submission resource.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Payment resource successfully retrieved  <br>**Headers** :   <br>`x-jws-signature` (string) : Header containing a detached JWS signature of the body of the payload.  <br>`x-fapi-interaction-id` (string) : An RFC4122 UID used as a correlation id.|[Payment Submit GET Response](#payment-submit-get-response)|
|**400**|Bad Request|No Content|
|**401**|Unauthorized|No Content|
|**403**|Forbidden|No Content|
|**429**|Too Many Requests|No Content|
|**500**|Internal Server Error|No Content|

<a name="payment-submit-get-response"></a>
**Payment Submit GET Response**

|Name|Description|Schema|
|---|---|---|
|**CreationDateTime**  <br>*required*|Date and time at which the resource was created.|string (date-time)|
|**Links**  <br>*required*|Link URIs relevant to the payload|[Links](#payment-submissions-paymentsubmissionid-get-links)|
|**Meta**  <br>*required*|Meta Data Relevant to the payload|[Meta](#payment-submissions-paymentsubmissionid-get-meta)|
|**PaymentId**  <br>*required*|OB: Unique identification as assigned by the ASPSP to uniquely identify the payment setup resource.  <br>**Length** : `1 - 40`|string|
|**PaymentSubmissionId**  <br>*required*|OB: Unique identification as assigned by the ASPSP to uniquely identify the payment submission resource.  <br>**Length** : `1 - 40`|string|
|**Status**  <br>*optional*|Specifies the status of the payment submission resource.|enum (AcceptedSettlementCompleted, AcceptedSettlementInProcess, Pending, Rejected)|

<a name="payment-submissions-paymentsubmissionid-get-links"></a>
**Links**

|Name|Schema|
|---|---|
|**first**  <br>*optional*|string (uri)|
|**last**  <br>*optional*|string (uri)|
|**next**  <br>*optional*|string (uri)|
|**prev**  <br>*optional*|string (uri)|
|**self**  <br>*required*|string (uri)|

<a name="payment-submissions-paymentsubmissionid-get-meta"></a>
**Meta**

|Name|Schema|
|---|---|
|**total-pages**  <br>*optional*|integer (int32)|


#### Produces

* `application/json`


#### Tags

* Payments


#### Security

|Type|Name|Scopes|
|---|---|---|
|**oauth2**|**[PSUOAuth2Security](#psuoauth2security)**|payment|


***

<a name="createsingleimmediatepayment"></a>
### Create a single immediate payment
```
POST /payments
```


#### Description
Create a single immediate payment


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**authorization**  <br>*required*|An Authorisation Token as per https://tools.ietf.org/html/rfc6750|string|
|**Header**|**x-fapi-customer-ip-address**  <br>*optional*|The PSU's IP address if the PSU is currently logged in with the TPP.|string|
|**Header**|**x-fapi-customer-last-logged-time**  <br>*optional*|The time when the PSU last logged in with the TPP.|string|
|**Header**|**x-fapi-financial-id**  <br>*required*|The unique id of the ASPSP to which the request is issued. The unique id will be issued by OB.|string|
|**Header**|**x-fapi-interaction-id**  <br>*optional*|An RFC4122 UID used as a correlation id.|string|
|**Header**|**x-idempotency-key**  <br>*required*|Every request will be processed only once per x-idempotency-key.  The Idempotency Key will be valid for 24 hours.|string|
|**Header**|**x-jws-signature**  <br>*required*|Header containing a detached JWS signature of the body of the payload.|string|


#### Body parameter
Setup a single immediate payment

*Name* : body  
*Flags* : required


|Name|Schema|
|---|---|
|**Data**  <br>*required*|[Payment Setup](#payment-setup)|
|**Risk**  <br>*required*|[Risk](#risk)|

<a name="payment-setup"></a>
**Payment Setup**

|Name|Schema|
|---|---|
|**Initiation**  <br>*required*|[Initiation](#payments-post-initiation)|

<a name="payments-post-initiation"></a>
**Initiation**

|Name|Description|Schema|
|---|---|---|
|**CreditorAccount**  <br>*required*|Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.|[Creditor Account](#creditor-account)|
|**CreditorAgent**  <br>*required*|Financial institution servicing an account for the creditor.|[Creditor Agent](#creditor-agent)|
|**DebtorAccount**  <br>*optional*|Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.|[Debtor Account](#debtor-account)|
|**DebtorAgent**  <br>*optional*|Financial institution servicing an account for the debtor.|[DebtorAgent](#debtoragent)|
|**EndToEndIdentification**  <br>*required*|Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain. Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction. OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.  <br>**Length** : `1 - 35`|string|
|**InstructedAmount**  <br>*required*|Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain.|[InstructedAmount](#payments-post-initiation-instructedamount)|
|**InstructionIdentification**  <br>*required*|Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction. Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.  <br>**Length** : `1 - 35`|string|
|**RemittanceInformation**  <br>*optional*|Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.|[Remittance Information](#remittance-information)|

<a name="creditor-account"></a>
**Creditor Account**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|Identification assigned by an institution to identify an account. This identification is known by the account owner.  <br>**Length** : `1 - 34`|string|
|**Name**  <br>*required*|Name of the account, as assigned by the account servicing institution, in agreement with the account owner in order to provide an additional means of identification of the account. Usage: The account name is different from the account owner name. The account name is used in certain user communities to provide a means of identifying the account, in addition to the account owner's identity and the account number. ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.  <br>**Length** : `1 - 70`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BBAN, IBAN)|
|**SecondaryIdentification**  <br>*optional*|Identification assigned by an institution to identify an account. This identification is known by the account owner.  <br>**Length** : `1 - 34`|string|

<a name="creditor-agent"></a>
**Creditor Agent**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|Unique and unambiguous identification of a person.  <br>**Length** : `1 - 35`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BICFI, UKSortCode)|

<a name="debtor-account"></a>
**Debtor Account**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|Identification assigned by an institution to identify an account. This identification is known by the account owner.  <br>**Length** : `1 - 34`|string|
|**Name**  <br>*optional*|Name of the account, as assigned by the account servicing institution, in agreement with the account owner in order to provide an additional means of identification of the account. Usage: The account name is different from the account owner name. The account name is used in certain user communities to provide a means of identifying the account, in addition to the account owner's identity and the account number.  <br>**Length** : `1 - 70`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BBAN, IBAN)|
|**SecondaryIdentification**  <br>*optional*|Identification assigned by an institution to identify an account. This identification is known by the account owner.  <br>**Length** : `1 - 34`|string|

<a name="debtoragent"></a>
**DebtorAgent**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|Unique and unambiguous identification of a person.  <br>**Length** : `1 - 35`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BICFI, UKSortCode)|

<a name="payments-post-initiation-instructedamount"></a>
**InstructedAmount**

|Name|Description|Schema|
|---|---|---|
|**Amount**  <br>*required*|**Pattern** : `"^-?\\d{1,13}\\.\\d{1,5}$"`|string|
|**Currency**  <br>*required*|A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 - Codes for the representation of currencies and funds.  <br>**Pattern** : `"[A-Z]{3}"`|string|

<a name="remittance-information"></a>
**Remittance Information**

|Name|Description|Schema|
|---|---|---|
|**Reference**  <br>*optional*|Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.  Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification. OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.  <br>**Length** : `1 - 35`|string|
|**Unstructured**  <br>*optional*|Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.  <br>**Length** : `1 - 140`|string|

<a name="risk"></a>
**Risk**

|Name|Description|Schema|
|---|---|---|
|**DeliveryAddress**  <br>*optional*|Information that locates and identifies a specific address, as defined by postal services or in free format text.|[DeliveryAddress](#payments-post-deliveryaddress)|
|**MerchantCategoryCode**  <br>*optional*|Category code conforms to ISO 18245, related to the type of services or goods the merchant provides for the transaction  <br>**Length** : `3 - 4`|string|
|**MerchantCustomerIdentification**  <br>*optional*|The unique customer identifier of the PSU with the merchant.  <br>**Length** : `1 - 70`|string|
|**PaymentContextCode**  <br>*optional*|Specifies the payment context|enum (BillPayment, EcommerceGoods, EcommerceServices, Other, PersonToPerson)|

<a name="payments-post-deliveryaddress"></a>
**DeliveryAddress**

|Name|Description|Schema|
|---|---|---|
|**AddressLine**  <br>*optional*|Information that locates and identifies a specific address, as defined by postal services, that is presented in free format text.|< string > array|
|**BuildingNumber**  <br>*optional*|Number that identifies the position of a building on a street.  <br>**Length** : `1 - 16`|string|
|**Country**  <br>*required*|Nation with its own government, occupying a particular territory.  <br>**Pattern** : `"[A-Z]{2}"`|string|
|**CountrySubDivision**  <br>*optional*|Identifies a subdivision of a country, for instance state, region, county.|< string > array|
|**PostCode**  <br>*optional*|Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail  <br>**Length** : `1 - 16`|string|
|**StreetName**  <br>*optional*|Name of a street or thoroughfare  <br>**Length** : `1 - 70`|string|
|**TownName**  <br>*required*|Name of a built-up area, with defined boundaries, and a local government.  <br>**Length** : `1 - 35`|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Payment setup resource successfully created  <br>**Headers** :   <br>`x-jws-signature` (string) : Header containing a detached JWS signature of the body of the payload.  <br>`x-fapi-interaction-id` (string) : An RFC4122 UID used as a correlation id.|[Payment setup POST response](#payment-setup-post-response)|
|**400**|Bad Request|No Content|
|**401**|Unauthorized|No Content|
|**403**|Forbidden|No Content|
|**429**|Too Many Requests|No Content|
|**500**|Internal Server Error|No Content|

<a name="payment-setup-post-response"></a>
**Payment setup POST response**

|Name|Description|Schema|
|---|---|---|
|**Data**  <br>*required*|Reflection of The Main Data Payload, with Created Resource ID, Status and Timestamp|[Payment Setup Response](#payment-setup-response)|
|**Links**  <br>*required*|Link URIs relevant to the payload|[Links](#payments-post-links)|
|**Meta**  <br>*required*|Meta Data Relevant to the payload|[Meta](#payments-post-meta)|
|**Risk**  <br>*required*|Reflection of POSTed Risk profile|[Risk](#risk)|

<a name="payment-setup-response"></a>
**Payment Setup Response**

|Name|Description|Schema|
|---|---|---|
|**CreationDateTime**  <br>*required*|Date and time at which the resource was created.|string (date-time)|
|**Initiation**  <br>*required*|The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor.|[Initiation](#payment-setup-response-initiation)|
|**PaymentId**  <br>*required*|OB: Unique identification as assigned by the ASPSP to uniquely identify the payment setup resource.  <br>**Length** : `1 - 40`|string|
|**Status**  <br>*optional*|Specifies the status of the payment resource.|enum (AcceptedCustomerProfile, AcceptedTechnicalValidation, Pending, Rejected)|

<a name="payment-setup-response-initiation"></a>
**Initiation**

|Name|Description|Schema|
|---|---|---|
|**CreditorAccount**  <br>*required*|Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.|[Creditor Account](#creditor-account)|
|**CreditorAgent**  <br>*required*|Financial institution servicing an account for the creditor.|[Creditor Agent](#creditor-agent)|
|**DebtorAccount**  <br>*optional*|Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.|[Debtor Account](#debtor-account)|
|**DebtorAgent**  <br>*optional*|Financial institution servicing an account for the debtor.|[DebtorAgent](#debtoragent)|
|**EndToEndIdentification**  <br>*required*|Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain. Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction. OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.  <br>**Length** : `1 - 35`|string|
|**InstructedAmount**  <br>*required*|Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain.|[InstructedAmount](#payment-setup-response-initiation-instructedamount)|
|**InstructionIdentification**  <br>*required*|Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction. Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.  <br>**Length** : `1 - 35`|string|
|**RemittanceInformation**  <br>*optional*|Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.|[Remittance Information](#remittance-information)|

<a name="creditor-account"></a>
**Creditor Account**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|Identification assigned by an institution to identify an account. This identification is known by the account owner.  <br>**Length** : `1 - 34`|string|
|**Name**  <br>*required*|Name of the account, as assigned by the account servicing institution, in agreement with the account owner in order to provide an additional means of identification of the account. Usage: The account name is different from the account owner name. The account name is used in certain user communities to provide a means of identifying the account, in addition to the account owner's identity and the account number. ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.  <br>**Length** : `1 - 70`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BBAN, IBAN)|
|**SecondaryIdentification**  <br>*optional*|Identification assigned by an institution to identify an account. This identification is known by the account owner.  <br>**Length** : `1 - 34`|string|

<a name="creditor-agent"></a>
**Creditor Agent**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|Unique and unambiguous identification of a person.  <br>**Length** : `1 - 35`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BICFI, UKSortCode)|

<a name="debtor-account"></a>
**Debtor Account**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|Identification assigned by an institution to identify an account. This identification is known by the account owner.  <br>**Length** : `1 - 34`|string|
|**Name**  <br>*optional*|Name of the account, as assigned by the account servicing institution, in agreement with the account owner in order to provide an additional means of identification of the account. Usage: The account name is different from the account owner name. The account name is used in certain user communities to provide a means of identifying the account, in addition to the account owner's identity and the account number.  <br>**Length** : `1 - 70`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BBAN, IBAN)|
|**SecondaryIdentification**  <br>*optional*|Identification assigned by an institution to identify an account. This identification is known by the account owner.  <br>**Length** : `1 - 34`|string|

<a name="debtoragent"></a>
**DebtorAgent**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|Unique and unambiguous identification of a person.  <br>**Length** : `1 - 35`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BICFI, UKSortCode)|

<a name="payment-setup-response-initiation-instructedamount"></a>
**InstructedAmount**

|Name|Description|Schema|
|---|---|---|
|**Amount**  <br>*required*|**Pattern** : `"^-?\\d{1,13}\\.\\d{1,5}$"`|string|
|**Currency**  <br>*required*|A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 - Codes for the representation of currencies and funds.  <br>**Pattern** : `"[A-Z]{3}"`|string|

<a name="remittance-information"></a>
**Remittance Information**

|Name|Description|Schema|
|---|---|---|
|**Reference**  <br>*optional*|Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.  Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification. OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.  <br>**Length** : `1 - 35`|string|
|**Unstructured**  <br>*optional*|Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.  <br>**Length** : `1 - 140`|string|

<a name="payments-post-links"></a>
**Links**

|Name|Schema|
|---|---|
|**first**  <br>*optional*|string (uri)|
|**last**  <br>*optional*|string (uri)|
|**next**  <br>*optional*|string (uri)|
|**prev**  <br>*optional*|string (uri)|
|**self**  <br>*required*|string (uri)|

<a name="payments-post-meta"></a>
**Meta**

|Name|Schema|
|---|---|
|**total-pages**  <br>*optional*|integer (int32)|

<a name="risk"></a>
**Risk**

|Name|Description|Schema|
|---|---|---|
|**DeliveryAddress**  <br>*optional*|Information that locates and identifies a specific address, as defined by postal services or in free format text.|[DeliveryAddress](#risk-deliveryaddress)|
|**MerchantCategoryCode**  <br>*optional*|Category code conforms to ISO 18245, related to the type of services or goods the merchant provides for the transaction  <br>**Length** : `3 - 4`|string|
|**MerchantCustomerIdentification**  <br>*optional*|The unique customer identifier of the PSU with the merchant.  <br>**Length** : `1 - 70`|string|
|**PaymentContextCode**  <br>*optional*|Specifies the payment context|enum (BillPayment, EcommerceGoods, EcommerceServices, Other, PersonToPerson)|

<a name="risk-deliveryaddress"></a>
**DeliveryAddress**

|Name|Description|Schema|
|---|---|---|
|**AddressLine**  <br>*optional*|Information that locates and identifies a specific address, as defined by postal services, that is presented in free format text.|< string > array|
|**BuildingNumber**  <br>*optional*|Number that identifies the position of a building on a street.  <br>**Length** : `1 - 16`|string|
|**Country**  <br>*required*|Nation with its own government, occupying a particular territory.  <br>**Pattern** : `"[A-Z]{2}"`|string|
|**CountrySubDivision**  <br>*optional*|Identifies a subdivision of a country, for instance state, region, county.|< string > array|
|**PostCode**  <br>*optional*|Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail  <br>**Length** : `1 - 16`|string|
|**StreetName**  <br>*optional*|Name of a street or thoroughfare  <br>**Length** : `1 - 70`|string|
|**TownName**  <br>*required*|Name of a built-up area, with defined boundaries, and a local government.  <br>**Length** : `1 - 35`|string|


#### Consumes

* `application/json`


#### Produces

* `application/json`


#### Tags

* Payments


#### Security

|Type|Name|Scopes|
|---|---|---|
|**oauth2**|**[TPPOAuth2Security](#tppoauth2security)**|tpp_client_credential|


***

<a name="getsingleimmediatepayment"></a>
### Get a single immediate payment
```
GET /payments/{PaymentId}
```


#### Description
Get a single immediate payment


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Header**|**authorization**  <br>*required*|An Authorisation Token as per https://tools.ietf.org/html/rfc6750|string|
|**Header**|**x-fapi-customer-ip-address**  <br>*optional*|The PSU's IP address if the PSU is currently logged in with the TPP.|string|
|**Header**|**x-fapi-customer-last-logged-time**  <br>*optional*|The time when the PSU last logged in with the TPP.|string|
|**Header**|**x-fapi-financial-id**  <br>*required*|The unique id of the ASPSP to which the request is issued. The unique id will be issued by OB.|string|
|**Header**|**x-fapi-interaction-id**  <br>*optional*|An RFC4122 UID used as a correlation id.|string|
|**Path**|**PaymentId**  <br>*required*|Unique identification as assigned by the ASPSP to uniquely identify the payment setup resource.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Payment resource successfully retrieved  <br>**Headers** :   <br>`x-jws-signature` (string) : Header containing a detached JWS signature of the body of the payload.  <br>`x-fapi-interaction-id` (string) : An RFC4122 UID used as a correlation id.|[Payment setup GET response](#payment-setup-get-response)|
|**400**|Bad Request|No Content|
|**401**|Unauthorized|No Content|
|**403**|Forbidden|No Content|
|**429**|Too Many Requests|No Content|
|**500**|Internal Server Error|No Content|

<a name="payment-setup-get-response"></a>
**Payment setup GET response**

|Name|Description|Schema|
|---|---|---|
|**Data**  <br>*required*|Reflection of The Main Data Payload, with Created Resource ID, Status and Timestamp|[Payment Setup Response](#payment-setup-response)|
|**Links**  <br>*required*|Link URIs relevant to the payload|[Links](#payments-paymentid-get-links)|
|**Meta**  <br>*required*|Meta Data Relevant to the payload|[Meta](#payments-paymentid-get-meta)|
|**Risk**  <br>*required*|Reflection of POSTed Risk profile|[Risk](#risk)|

<a name="payment-setup-response"></a>
**Payment Setup Response**

|Name|Description|Schema|
|---|---|---|
|**CreationDateTime**  <br>*required*|Date and time at which the resource was created.|string (date-time)|
|**Initiation**  <br>*required*|The Initiation payload is sent by the initiating party to the ASPSP. It is used to request movement of funds from the debtor account to a creditor.|[Initiation](#payment-setup-response-initiation)|
|**PaymentId**  <br>*required*|OB: Unique identification as assigned by the ASPSP to uniquely identify the payment setup resource.  <br>**Length** : `1 - 40`|string|
|**Status**  <br>*optional*|Specifies the status of the payment resource.|enum (AcceptedCustomerProfile, AcceptedTechnicalValidation, Pending, Rejected)|

<a name="payment-setup-response-initiation"></a>
**Initiation**

|Name|Description|Schema|
|---|---|---|
|**CreditorAccount**  <br>*required*|Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.|[Creditor Account](#creditor-account)|
|**CreditorAgent**  <br>*required*|Financial institution servicing an account for the creditor.|[Creditor Agent](#creditor-agent)|
|**DebtorAccount**  <br>*optional*|Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.|[Debtor Account](#debtor-account)|
|**DebtorAgent**  <br>*optional*|Financial institution servicing an account for the debtor.|[DebtorAgent](#debtoragent)|
|**EndToEndIdentification**  <br>*required*|Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain. Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction. OB: The Faster Payments Scheme can only access 31 characters for the EndToEndIdentification field.  <br>**Length** : `1 - 35`|string|
|**InstructedAmount**  <br>*required*|Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain.|[InstructedAmount](#payment-setup-response-initiation-instructedamount)|
|**InstructionIdentification**  <br>*required*|Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction. Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.  <br>**Length** : `1 - 35`|string|
|**RemittanceInformation**  <br>*optional*|Information supplied to enable the matching of an entry with the items that the transfer is intended to settle, such as commercial invoices in an accounts' receivable system.|[Remittance Information](#remittance-information)|

<a name="creditor-account"></a>
**Creditor Account**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|Identification assigned by an institution to identify an account. This identification is known by the account owner.  <br>**Length** : `1 - 34`|string|
|**Name**  <br>*required*|Name of the account, as assigned by the account servicing institution, in agreement with the account owner in order to provide an additional means of identification of the account. Usage: The account name is different from the account owner name. The account name is used in certain user communities to provide a means of identifying the account, in addition to the account owner's identity and the account number. ASPSPs may carry out name validation for Confirmation of Payee, but it is not mandatory.  <br>**Length** : `1 - 70`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BBAN, IBAN)|
|**SecondaryIdentification**  <br>*optional*|Identification assigned by an institution to identify an account. This identification is known by the account owner.  <br>**Length** : `1 - 34`|string|

<a name="creditor-agent"></a>
**Creditor Agent**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|Unique and unambiguous identification of a person.  <br>**Length** : `1 - 35`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BICFI, UKSortCode)|

<a name="debtor-account"></a>
**Debtor Account**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|Identification assigned by an institution to identify an account. This identification is known by the account owner.  <br>**Length** : `1 - 34`|string|
|**Name**  <br>*optional*|Name of the account, as assigned by the account servicing institution, in agreement with the account owner in order to provide an additional means of identification of the account. Usage: The account name is different from the account owner name. The account name is used in certain user communities to provide a means of identifying the account, in addition to the account owner's identity and the account number.  <br>**Length** : `1 - 70`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BBAN, IBAN)|
|**SecondaryIdentification**  <br>*optional*|Identification assigned by an institution to identify an account. This identification is known by the account owner.  <br>**Length** : `1 - 34`|string|

<a name="debtoragent"></a>
**DebtorAgent**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|Unique and unambiguous identification of a person.  <br>**Length** : `1 - 35`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BICFI, UKSortCode)|

<a name="payment-setup-response-initiation-instructedamount"></a>
**InstructedAmount**

|Name|Description|Schema|
|---|---|---|
|**Amount**  <br>*required*|**Pattern** : `"^-?\\d{1,13}\\.\\d{1,5}$"`|string|
|**Currency**  <br>*required*|A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 - Codes for the representation of currencies and funds.  <br>**Pattern** : `"[A-Z]{3}"`|string|

<a name="remittance-information"></a>
**Remittance Information**

|Name|Description|Schema|
|---|---|---|
|**Reference**  <br>*optional*|Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction.  Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification. OB: The Faster Payments Scheme can only accept 18 characters for the ReferenceInformation field - which is where this ISO field will be mapped.  <br>**Length** : `1 - 35`|string|
|**Unstructured**  <br>*optional*|Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.  <br>**Length** : `1 - 140`|string|

<a name="payments-paymentid-get-links"></a>
**Links**

|Name|Schema|
|---|---|
|**first**  <br>*optional*|string (uri)|
|**last**  <br>*optional*|string (uri)|
|**next**  <br>*optional*|string (uri)|
|**prev**  <br>*optional*|string (uri)|
|**self**  <br>*required*|string (uri)|

<a name="payments-paymentid-get-meta"></a>
**Meta**

|Name|Schema|
|---|---|
|**total-pages**  <br>*optional*|integer (int32)|

<a name="risk"></a>
**Risk**

|Name|Description|Schema|
|---|---|---|
|**DeliveryAddress**  <br>*optional*|Information that locates and identifies a specific address, as defined by postal services or in free format text.|[DeliveryAddress](#risk-deliveryaddress)|
|**MerchantCategoryCode**  <br>*optional*|Category code conforms to ISO 18245, related to the type of services or goods the merchant provides for the transaction  <br>**Length** : `3 - 4`|string|
|**MerchantCustomerIdentification**  <br>*optional*|The unique customer identifier of the PSU with the merchant.  <br>**Length** : `1 - 70`|string|
|**PaymentContextCode**  <br>*optional*|Specifies the payment context|enum (BillPayment, EcommerceGoods, EcommerceServices, Other, PersonToPerson)|

<a name="risk-deliveryaddress"></a>
**DeliveryAddress**

|Name|Description|Schema|
|---|---|---|
|**AddressLine**  <br>*optional*|Information that locates and identifies a specific address, as defined by postal services, that is presented in free format text.|< string > array|
|**BuildingNumber**  <br>*optional*|Number that identifies the position of a building on a street.  <br>**Length** : `1 - 16`|string|
|**Country**  <br>*required*|Nation with its own government, occupying a particular territory.  <br>**Pattern** : `"[A-Z]{2}"`|string|
|**CountrySubDivision**  <br>*optional*|Identifies a subdivision of a country, for instance state, region, county.|< string > array|
|**PostCode**  <br>*optional*|Identifier consisting of a group of letters and/or numbers that is added to a postal address to assist the sorting of mail  <br>**Length** : `1 - 16`|string|
|**StreetName**  <br>*optional*|Name of a street or thoroughfare  <br>**Length** : `1 - 70`|string|
|**TownName**  <br>*required*|Name of a built-up area, with defined boundaries, and a local government.  <br>**Length** : `1 - 35`|string|


#### Produces

* `application/json`


#### Tags

* Payments


#### Security

|Type|Name|Scopes|
|---|---|---|
|**oauth2**|**[PSUOAuth2Security](#psuoauth2security)**|payment|






<a name="securityscheme"></a>
## Security

<a name="tppoauth2security"></a>
### TPPOAuth2Security
TPP client credential authorisation flow with the ASPSP

*Type* : oauth2  
*Flow* : application  
*Token URL* : /token


|Name|Description|
|---|---|
|tpp_client_credential|TPP Client Credential Scope|


<a name="psuoauth2security"></a>
### PSUOAuth2Security
OAuth flow, it is required when the PSU needs to perform SCA with the ASPSP when a TPP wants to access an ASPSP resource owned by the PSU

*Type* : oauth2  
*Flow* : accessCode  
*Token URL* : /authorization  
*Token URL* : /token


|Name|Description|
|---|---|
|payment|Generic payment scope|



