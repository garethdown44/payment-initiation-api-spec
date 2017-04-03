# Read Write APIs


<a name="overview"></a>
## Overview
Draft Swagger specification for Read Write


### Version information
*Version* : v0.1


### Contact information
*Contact* : Claudio Viola  
*Contact Email* : claudio.viola@openbanking.org.uk


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


#### Body parameter
Setup a single immediate payment

*Name* : body  
*Flags* : required


|Name|Description|Schema|
|---|---|---|
|**CreditorAccount**  <br>*required*|Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.|[CreditorAccount](#createpaymentsubmission-creditoraccount)|
|**CreditorAgent**  <br>*required*|Financial institution servicing an account for the creditor.|[CreditorAgent](#createpaymentsubmission-creditoragent)|
|**DebtorAccount**  <br>*optional*|Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.|[DebtorAccount](#createpaymentsubmission-debtoraccount)|
|**DebtorAgent**  <br>*optional*|Financial institution servicing an account for the debtor.|[DebtorAgent](#createpaymentsubmission-debtoragent)|
|**EndToEndIdentification**  <br>*required*|Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain. Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.  <br>**Length** : `1 - 35`|string|
|**InstructedAmount**  <br>*required*|Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain.|[InstructedAmount](#createpaymentsubmission-instructedamount)|
|**InstructionIdentification**  <br>*required*|Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction. Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.  <br>**Length** : `1 - 35`|string|
|**MerchantCategoryCode**  <br>*optional*|Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.  <br>**Length** : `3 - 4`|string|
|**PaymentId**  <br>*required*|Unique identification as assigned by the ASPSP to uniquely identify the payment setup resource.  <br>**Length** : `1 - 35`|string|
|**RemittanceInformation**  <br>*optional*|Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.|[RemittanceInformation](#createpaymentsubmission-remittanceinformation)|

<a name="createpaymentsubmission-creditoraccount"></a>
**CreditorAccount**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|maxLength 34 text  <br>**Length** : `1 - 34`|string|
|**Name**  <br>*required*|maxLength 70 text  <br>**Length** : `1 - 70`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BBAN)|

<a name="createpaymentsubmission-creditoragent"></a>
**CreditorAgent**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|United Kingdom (UK) Sort Code - identifies British financial institutions on the British national clearing systems. The sort code is assigned by the Association for Payments and Clearing Services (APACS).  <br>**Pattern** : `"^SC[0-9]{6,6}$"`|string|
|**SchemeName**  <br>*required*|Specifies the external financial institution identification scheme name code in the format of character string.|enum (UKSortCode)|

<a name="createpaymentsubmission-debtoraccount"></a>
**DebtorAccount**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|maxLength 34 text  <br>**Length** : `1 - 34`|string|
|**Name**  <br>*optional*|maxLength 70 text  <br>**Length** : `1 - 70`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BBAN)|

<a name="createpaymentsubmission-debtoragent"></a>
**DebtorAgent**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|United Kingdom (UK) Sort Code - identifies British financial institutions on the British national clearing systems. The sort code is assigned by the Association for Payments and Clearing Services (APACS).  <br>**Pattern** : `"^SC[0-9]{6,6}$"`|string|
|**SchemeName**  <br>*required*|Specifies the external financial institution identification scheme name code in the format of character string.|enum (UKSortCode)|

<a name="createpaymentsubmission-instructedamount"></a>
**InstructedAmount**

|Name|Description|Schema|
|---|---|---|
|**Amount**  <br>*required*|**Pattern** : `"^-?\\d{1,13}\\.\\d{1,5}$"`|string|
|**Currency**  <br>*required*|A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 'Codes for the representation of currencies and funds'  <br>**Pattern** : `"^[A-Z]{3}$"`|string|

<a name="createpaymentsubmission-remittanceinformation"></a>
**RemittanceInformation**

|Name|Description|Schema|
|---|---|---|
|**CreditorReferenceInformation**  <br>*optional*|Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction. Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.  <br>**Length** : `1 - 35`|string|
|**Unstructured**  <br>*optional*|Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.  <br>**Length** : `1 - 140`|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Payment submit resource successfully created|[Response 201](#createpaymentsubmission-response-201)|
|**400**|Bad Request|No Content|
|**401**|Unauthorized|No Content|
|**403**|Forbidden|No Content|
|**409**|Conflict|No Content|
|**500**|Internal Server Error|No Content|

<a name="createpaymentsubmission-response-201"></a>
**Response 201**

|Name|Description|Schema|
|---|---|---|
|**CreatedAt**  <br>*required*|Date and time at which the resource was created.|string (date-time)|
|**Links**  <br>*required*||< [Links](#payment-submissions-post-links) > array|
|**PaymentId**  <br>*required*|Unique identification as assigned by the ASPSP to uniquely identify the payment setup resource.  <br>**Length** : `1 - 35`|string|
|**PaymentSubmissionId**  <br>*required*|Unique identification as assigned by the ASPSP to uniquely identify the payment submission resource.  <br>**Length** : `1 - 35`|string|
|**Status**  <br>*required*|Status of the payment setup resource|enum (AcceptedSettlementInProcess, AcceptedSettlementCompleted, Received, Rejected)|

<a name="payment-submissions-post-links"></a>
**Links**

|Name|Schema|
|---|---|
|**href**  <br>*optional*|string (uri)|
|**method**  <br>*optional*|enum (GET)|
|**rel**  <br>*optional*|enum (self)|


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
|**Path**|**PaymentSubmissionId**  <br>*required*|Unique identification as assigned by the ASPSP to uniquely identify the payment submission resource.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Payment resource successfully retrieved|[Response 200](#getpaymentsubmission-response-200)|
|**400**|Bad Request|No Content|
|**401**|Unauthorized|No Content|
|**403**|Forbidden|No Content|
|**404**|Not Found|No Content|
|**500**|Internal Server Error|No Content|

<a name="getpaymentsubmission-response-200"></a>
**Response 200**

|Name|Description|Schema|
|---|---|---|
|**CreatedAt**  <br>*required*|Date and time at which the resource was created.|string (date-time)|
|**Links**  <br>*required*||< [Links](#payment-submissions-paymentsubmissionid-get-links) > array|
|**PaymentId**  <br>*required*|Unique identification as assigned by the ASPSP to uniquely identify the payment setup resource.  <br>**Length** : `1 - 35`|string|
|**PaymentSubmissionId**  <br>*required*|Unique identification as assigned by the ASPSP to uniquely identify the payment submission resource.  <br>**Length** : `1 - 35`|string|
|**Status**  <br>*required*|Status of the payment setup resource|enum (AcceptedSettlementInProcess, AcceptedSettlementCompleted, Received, Rejected)|

<a name="payment-submissions-paymentsubmissionid-get-links"></a>
**Links**

|Name|Schema|
|---|---|
|**href**  <br>*optional*|string (uri)|
|**method**  <br>*optional*|enum (GET)|
|**rel**  <br>*optional*|enum (self)|


#### Produces

* `application/json`


#### Tags

* Payments


#### Security

|Type|Name|Scopes|
|---|---|---|
|**oauth2**|**[TPPOAuth2Security](#tppoauth2security)**|tpp_client_credential|


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
|**Header**|**Idempotency-Key**  <br>*required*|Every request will be processed only once per idempotency-key|string|


#### Body parameter
Setup a single immediate payment

*Name* : body  
*Flags* : required


|Name|Description|Schema|
|---|---|---|
|**CreditorAccount**  <br>*required*|Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.|[CreditorAccount](#createsingleimmediatepayment-creditoraccount)|
|**CreditorAgent**  <br>*required*|Financial institution servicing an account for the creditor.|[CreditorAgent](#createsingleimmediatepayment-creditoragent)|
|**DebtorAccount**  <br>*optional*|Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.|[DebtorAccount](#createsingleimmediatepayment-debtoraccount)|
|**DebtorAgent**  <br>*optional*|Financial institution servicing an account for the debtor.|[DebtorAgent](#createsingleimmediatepayment-debtoragent)|
|**EndToEndIdentification**  <br>*required*|Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain. Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.  <br>**Length** : `1 - 35`|string|
|**InstructedAmount**  <br>*required*|Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain.|[InstructedAmount](#createsingleimmediatepayment-instructedamount)|
|**InstructionIdentification**  <br>*required*|Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction. Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.  <br>**Length** : `1 - 35`|string|
|**MerchantCategoryCode**  <br>*optional*|Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.  <br>**Length** : `3 - 4`|string|
|**RemittanceInformation**  <br>*optional*|Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.|[RemittanceInformation](#createsingleimmediatepayment-remittanceinformation)|

<a name="createsingleimmediatepayment-creditoraccount"></a>
**CreditorAccount**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|maxLength 34 text  <br>**Length** : `1 - 34`|string|
|**Name**  <br>*required*|maxLength 70 text  <br>**Length** : `1 - 70`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BBAN)|

<a name="createsingleimmediatepayment-creditoragent"></a>
**CreditorAgent**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|United Kingdom (UK) Sort Code - identifies British financial institutions on the British national clearing systems. The sort code is assigned by the Association for Payments and Clearing Services (APACS).  <br>**Pattern** : `"^SC[0-9]{6,6}$"`|string|
|**SchemeName**  <br>*required*|Specifies the external financial institution identification scheme name code in the format of character string.|enum (UKSortCode)|

<a name="createsingleimmediatepayment-debtoraccount"></a>
**DebtorAccount**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|maxLength 34 text  <br>**Length** : `1 - 34`|string|
|**Name**  <br>*optional*|maxLength 70 text  <br>**Length** : `1 - 70`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BBAN)|

<a name="createsingleimmediatepayment-debtoragent"></a>
**DebtorAgent**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|United Kingdom (UK) Sort Code - identifies British financial institutions on the British national clearing systems. The sort code is assigned by the Association for Payments and Clearing Services (APACS).  <br>**Pattern** : `"^SC[0-9]{6,6}$"`|string|
|**SchemeName**  <br>*required*|Specifies the external financial institution identification scheme name code in the format of character string.|enum (UKSortCode)|

<a name="createsingleimmediatepayment-instructedamount"></a>
**InstructedAmount**

|Name|Description|Schema|
|---|---|---|
|**Amount**  <br>*required*|**Pattern** : `"^-?\\d{1,13}\\.\\d{1,5}$"`|string|
|**Currency**  <br>*required*|A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 'Codes for the representation of currencies and funds'  <br>**Pattern** : `"^[A-Z]{3}$"`|string|

<a name="createsingleimmediatepayment-remittanceinformation"></a>
**RemittanceInformation**

|Name|Description|Schema|
|---|---|---|
|**CreditorReferenceInformation**  <br>*optional*|Unique reference, as assigned by the creditor, to unambiguously refer to the payment transaction. Usage: If available, the initiating party should provide this reference in the structured remittance information, to enable reconciliation by the creditor upon receipt of the amount of money. If the business context requires the use of a creditor reference or a payment remit identification, and only one identifier can be passed through the end-to-end chain, the creditor's reference or payment remittance identification should be quoted in the end-to-end transaction identification.  <br>**Length** : `1 - 35`|string|
|**Unstructured**  <br>*optional*|Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.  <br>**Length** : `1 - 140`|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**201**|Payment setup resource successfully created|[Payment setup POST response](#payment-setup-post-response)|
|**400**|Bad Request|No Content|
|**401**|Unauthorized|No Content|
|**403**|Forbidden|No Content|
|**409**|Conflict|No Content|
|**500**|Internal Server Error|No Content|

<a name="payment-setup-post-response"></a>
**Payment setup POST response**

|Name|Description|Schema|
|---|---|---|
|**CreatedAt**  <br>*required*|Date and time at which the resource was created.|string (date-time)|
|**CreditorAccount**  <br>*required*|Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.|[CreditorAccount](#payments-post-creditoraccount)|
|**CreditorAgent**  <br>*required*|Financial institution servicing an account for the creditor.|[CreditorAgent](#payments-post-creditoragent)|
|**DebtorAccount**  <br>*optional*|Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.|[DebtorAccount](#payments-post-debtoraccount)|
|**DebtorAgent**  <br>*optional*|Financial institution servicing an account for the debtor.|[DebtorAgent](#payments-post-debtoragent)|
|**EndToEndIdentification**  <br>*required*|Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain. Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.  <br>**Length** : `1 - 35`|string|
|**InstructedAmount**  <br>*required*|Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain.|[InstructedAmount](#payments-post-instructedamount)|
|**InstructionIdentification**  <br>*required*|Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction. Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.  <br>**Length** : `1 - 35`|string|
|**Links**  <br>*required*||< [Links](#payments-post-links) > array|
|**MerchantCategoryCode**  <br>*optional*|Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.  <br>**Length** : `3 - 4`|string|
|**PaymentId**  <br>*required*|Unique identification as assigned by the ASPSP to uniquely identify the payment setup resource.  <br>**Length** : `1 - 35`|string|
|**RemittanceInformation**  <br>*optional*|Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.  <br>**Length** : `1 - 140`|string|
|**Status**  <br>*required*|Status of the payment setup resource|enum (Pending, AcceptedTechnicalValidation, AcceptedCustomerProfile, Rejected)|

<a name="payments-post-creditoraccount"></a>
**CreditorAccount**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|maxLength 34 text  <br>**Length** : `1 - 34`|string|
|**Name**  <br>*required*|maxLength 70 text  <br>**Length** : `1 - 70`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BBAN)|

<a name="payments-post-creditoragent"></a>
**CreditorAgent**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|United Kingdom (UK) Sort Code - identifies British financial institutions on the British national clearing systems. The sort code is assigned by the Association for Payments and Clearing Services (APACS).  <br>**Pattern** : `"^SC[0-9]{6,6}$"`|string|
|**SchemeName**  <br>*required*|Specifies the external financial institution identification scheme name code in the format of character string.|enum (UKSortCode)|

<a name="payments-post-debtoraccount"></a>
**DebtorAccount**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|maxLength 34 text  <br>**Length** : `1 - 34`|string|
|**Name**  <br>*optional*|maxLength 70 text  <br>**Length** : `1 - 70`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BBAN)|

<a name="payments-post-debtoragent"></a>
**DebtorAgent**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|United Kingdom (UK) Sort Code - identifies British financial institutions on the British national clearing systems. The sort code is assigned by the Association for Payments and Clearing Services (APACS).  <br>**Pattern** : `"^SC[0-9]{6,6}$"`|string|
|**SchemeName**  <br>*required*|Specifies the external financial institution identification scheme name code in the format of character string.|enum (UKSortCode)|

<a name="payments-post-instructedamount"></a>
**InstructedAmount**

|Name|Description|Schema|
|---|---|---|
|**Amount**  <br>*required*|**Pattern** : `"^-?\\d{1,13}\\.\\d{1,5}$"`|string|
|**Currency**  <br>*required*|A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 'Codes for the representation of currencies and funds'  <br>**Pattern** : `"^[A-Z]{3}$"`|string|

<a name="payments-post-links"></a>
**Links**

|Name|Schema|
|---|---|
|**href**  <br>*optional*|string (uri)|
|**method**  <br>*optional*|enum (GET)|
|**rel**  <br>*optional*|enum (self)|


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
|**Path**|**PaymentId**  <br>*required*|Unique identification as assigned by the ASPSP to uniquely identify the payment setup resource.|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Payment resource successfully retrieved|[Payment setup GET response](#payment-setup-get-response)|
|**400**|Bad Request|No Content|
|**401**|Unauthorized|No Content|
|**403**|Forbidden|No Content|
|**404**|Not Found|No Content|
|**500**|Internal Server Error|No Content|

<a name="payment-setup-get-response"></a>
**Payment setup GET response**

|Name|Description|Schema|
|---|---|---|
|**CreatedAt**  <br>*required*|Date and time at which the resource was created.|string (date-time)|
|**CreditorAccount**  <br>*required*|Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.|[CreditorAccount](#payments-paymentid-get-creditoraccount)|
|**CreditorAgent**  <br>*required*|Financial institution servicing an account for the creditor.|[CreditorAgent](#payments-paymentid-get-creditoragent)|
|**DebtorAccount**  <br>*optional*|Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.|[DebtorAccount](#payments-paymentid-get-debtoraccount)|
|**DebtorAgent**  <br>*optional*|Financial institution servicing an account for the debtor.|[DebtorAgent](#payments-paymentid-get-debtoragent)|
|**EndToEndIdentification**  <br>*required*|Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain. Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.  <br>**Length** : `1 - 35`|string|
|**InstructedAmount**  <br>*required*|Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain.|[InstructedAmount](#payments-paymentid-get-instructedamount)|
|**InstructionIdentification**  <br>*required*|Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction. Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.  <br>**Length** : `1 - 35`|string|
|**Links**  <br>*required*||< [Links](#payments-paymentid-get-links) > array|
|**MerchantCategoryCode**  <br>*optional*|Category code conform to ISO 18245, related to the type of services or goods the merchant provides for the transaction.  <br>**Length** : `3 - 4`|string|
|**PaymentId**  <br>*required*|Unique identification as assigned by the ASPSP to uniquely identify the payment setup resource.  <br>**Length** : `1 - 35`|string|
|**RemittanceInformation**  <br>*optional*|Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.  <br>**Length** : `1 - 140`|string|
|**Status**  <br>*required*|Status of the payment setup resource|enum (Pending, AcceptedTechnicalValidation, AcceptedCustomerProfile, Rejected)|

<a name="payments-paymentid-get-creditoraccount"></a>
**CreditorAccount**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|maxLength 34 text  <br>**Length** : `1 - 34`|string|
|**Name**  <br>*required*|maxLength 70 text  <br>**Length** : `1 - 70`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BBAN)|

<a name="payments-paymentid-get-creditoragent"></a>
**CreditorAgent**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|United Kingdom (UK) Sort Code - identifies British financial institutions on the British national clearing systems. The sort code is assigned by the Association for Payments and Clearing Services (APACS).  <br>**Pattern** : `"^SC[0-9]{6,6}$"`|string|
|**SchemeName**  <br>*required*|Specifies the external financial institution identification scheme name code in the format of character string.|enum (UKSortCode)|

<a name="payments-paymentid-get-debtoraccount"></a>
**DebtorAccount**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|maxLength 34 text  <br>**Length** : `1 - 34`|string|
|**Name**  <br>*optional*|maxLength 70 text  <br>**Length** : `1 - 70`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BBAN)|

<a name="payments-paymentid-get-debtoragent"></a>
**DebtorAgent**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|United Kingdom (UK) Sort Code - identifies British financial institutions on the British national clearing systems. The sort code is assigned by the Association for Payments and Clearing Services (APACS).  <br>**Pattern** : `"^SC[0-9]{6,6}$"`|string|
|**SchemeName**  <br>*required*|Specifies the external financial institution identification scheme name code in the format of character string.|enum (UKSortCode)|

<a name="payments-paymentid-get-instructedamount"></a>
**InstructedAmount**

|Name|Description|Schema|
|---|---|---|
|**Amount**  <br>*required*|**Pattern** : `"^-?\\d{1,13}\\.\\d{1,5}$"`|string|
|**Currency**  <br>*required*|A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 'Codes for the representation of currencies and funds'  <br>**Pattern** : `"^[A-Z]{3}$"`|string|

<a name="payments-paymentid-get-links"></a>
**Links**

|Name|Schema|
|---|---|
|**href**  <br>*optional*|string (uri)|
|**method**  <br>*optional*|enum (GET)|
|**rel**  <br>*optional*|enum (self)|


#### Produces

* `application/json`


#### Tags

* Payments


#### Security

|Type|Name|Scopes|
|---|---|---|
|**oauth2**|**[TPPOAuth2Security](#tppoauth2security)**|tpp_client_credential|






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



