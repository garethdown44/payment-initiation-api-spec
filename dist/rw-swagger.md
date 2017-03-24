# Read Write APIs


<a name="overview"></a>
## Overview
Draft Swagger specification for Read Write


### Version information
*Version* : v0.1


### Contact information
*Contact* : Claudio Viola  
*Contact Email* : claudio.viola@openbanking.org.uk


### URI scheme
*BasePath* : /open-banking  
*Schemes* : HTTPS


### Tags

* Payments : Payments endpoints


### Produces

* `application/prs.openbanking.rwdata.v0.1+json`




<a name="paths"></a>
## Paths

***

<a name="setupsingleimmediatepayment"></a>
### Setup a single immediate payment
```
POST /payments
```


#### Description
Setup a single immediate payment


#### Body parameter
Setup a single immediate payment

*Name* : body  
*Flags* : required


|Name|Description|Schema|
|---|---|---|
|**CreditorAccount**  <br>*required*|Unambiguous identification of the account of the creditor to which a credit entry will be posted as a result of the payment transaction.|[CreditorAccount](#setupsingleimmediatepayment-creditoraccount)|
|**CreditorAgent**  <br>*required*|Financial institution servicing an account for the creditor.|[CreditorAgent](#setupsingleimmediatepayment-creditoragent)|
|**DebtorAccount**  <br>*optional*|Unambiguous identification of the account of the debtor to which a debit entry will be made as a result of the transaction.|[DebtorAccount](#setupsingleimmediatepayment-debtoraccount)|
|**DebtorAgent**  <br>*optional*|Financial institution servicing an account for the debtor.|[DebtorAgent](#setupsingleimmediatepayment-debtoragent)|
|**EndToEndIdentification**  <br>*required*|Unique identification assigned by the initiating party to unambiguously identify the transaction. This identification is passed on, unchanged, throughout the entire end-to-end chain. Usage: The end-to-end identification can be used for reconciliation or to link tasks relating to the transaction. It can be included in several messages related to the transaction.  <br>**Length** : `1 - 35`|string|
|**InstructedAmount**  <br>*required*|Amount of money to be moved between the debtor and creditor, before deduction of charges, expressed in the currency as ordered by the initiating party. Usage: This amount has to be transported unchanged through the transaction chain.|[InstructedAmount](#setupsingleimmediatepayment-instructedamount)|
|**InstructionIdentification**  <br>*required*|Unique identification as assigned by an instructing party for an instructed party to unambiguously identify the instruction. Usage: the  instruction identification is a point to point reference that can be used between the instructing party and the instructed party to refer to the individual instruction. It can be included in several messages related to the instruction.  <br>**Length** : `1 - 35`|string|
|**RemittanceInformation**  <br>*optional*|Information supplied to enable the matching/reconciliation of an entry with the items that the payment is intended to settle, such as commercial invoices in an accounts' receivable system, in an unstructured form.  <br>**Length** : `1 - 140`|string|

<a name="setupsingleimmediatepayment-creditoraccount"></a>
**CreditorAccount**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|maxLength 34 text  <br>**Length** : `1 - 34`|string|
|**Name**  <br>*optional*|maxLength 70 text  <br>**Length** : `1 - 70`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BBAN)|

<a name="setupsingleimmediatepayment-creditoragent"></a>
**CreditorAgent**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|United Kingdom (UK) Sort Code - identifies British financial institutions on the British national clearing systems. The sort code is assigned by the Association for Payments and Clearing Services (APACS).  <br>**Pattern** : `"^SC[0-9]{6,6}$"`|string|
|**SchemeName**  <br>*required*|Specifies the external financial institution identification scheme name code in the format of character string.|enum (UKSortCode)|

<a name="setupsingleimmediatepayment-debtoraccount"></a>
**DebtorAccount**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|maxLength 34 text  <br>**Length** : `1 - 34`|string|
|**Name**  <br>*optional*|maxLength 70 text  <br>**Length** : `1 - 70`|string|
|**SchemeName**  <br>*required*|Name of the identification scheme, in a coded form as published in an external list.|enum (BBAN)|

<a name="setupsingleimmediatepayment-debtoragent"></a>
**DebtorAgent**

|Name|Description|Schema|
|---|---|---|
|**Identification**  <br>*required*|United Kingdom (UK) Sort Code - identifies British financial institutions on the British national clearing systems. The sort code is assigned by the Association for Payments and Clearing Services (APACS).  <br>**Pattern** : `"^SC[0-9]{6,6}$"`|string|
|**SchemeName**  <br>*required*|Specifies the external financial institution identification scheme name code in the format of character string.|enum (UKSortCode)|

<a name="setupsingleimmediatepayment-instructedamount"></a>
**InstructedAmount**

|Name|Description|Schema|
|---|---|---|
|**Amount**  <br>*required*|**Pattern** : `"^-?\\d{1,13}\\.\\d{1,5}$"`|string|
|**Currency**  <br>*required*|A code allocated to a currency by a Maintenance Agency under an international identification scheme, as described in the latest edition of the international standard ISO 4217 'Codes for the representation of currencies and funds'  <br>**Pattern** : `"^[A-Z]{3}$"`|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Payment setup successfully|[Payment setup POST 200 Response](#payment-setup-post-200-response)|
|**400**|Bad Request|[HTTP 400 Error](#http-400-error)|
|**401**|Unauthorized|[HTTP 401 Error](#http-401-error)|
|**403**|Forbidden|[HTTP 403 Error](#http-403-error)|
|**409**|Conflict|[HTTP 409 Error](#http-409-error)|
|**500**|Internal Server Error|[HTTP 500 Error](#http-500-error)|

<a name="payment-setup-post-200-response"></a>
**Payment setup POST 200 Response**

|Name|Description|Schema|
|---|---|---|
|**PaymentAuthorisationID**  <br>*required*|ASPSP authorisation identifier for the payment  <br>**Length** : `1 - 35`|string|

<a name="http-400-error"></a>
**HTTP 400 Error**

|Name|Schema|
|---|---|
|**description**  <br>*required*|enum (The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.)|
|**status**  <br>*required*|enum (400)|
|**title**  <br>*required*|enum (BadRequest)|

<a name="http-401-error"></a>
**HTTP 401 Error**

|Name|Schema|
|---|---|
|**description**  <br>*required*|enum (The request requires user authentication.)|
|**status**  <br>*required*|enum (401)|
|**title**  <br>*required*|enum (Unauthorised)|

<a name="http-403-error"></a>
**HTTP 403 Error**

|Name|Schema|
|---|---|
|**description**  <br>*required*|enum (The server understood the request, but is refusing to fulfill it. Authorization will not help and the request SHOULD NOT be repeated.)|
|**status**  <br>*required*|enum (403)|
|**title**  <br>*required*|enum (Forbidden)|

<a name="http-409-error"></a>
**HTTP 409 Error**

|Name|Schema|
|---|---|
|**description**  <br>*required*|enum (The request could not be completed due to a conflict with the current state of the resource.)|
|**status**  <br>*required*|enum (409)|
|**title**  <br>*required*|enum (Conflict)|

<a name="http-500-error"></a>
**HTTP 500 Error**

|Name|Schema|
|---|---|
|**description**  <br>*required*|enum (The server encountered an unexpected condition which prevented it from fulfilling the request.)|
|**status**  <br>*required*|enum (500)|
|**title**  <br>*required*|enum (InternalServerError)|


#### Consumes

* `application/prs.openbanking.rwdata.v0.1+json`


#### Produces

* `application/prs.openbanking.rwdata.v0.1+json`


#### Tags

* Payments


#### Security

|Type|Name|Scopes|
|---|---|---|
|**oauth2**|**[TPPOAuth2Security](#tppoauth2security)**|tpp_client_credential|


***

<a name="submitsingleimmediatepayment"></a>
### Submit a single immediate payment
```
PATCH /payments/{PaymentAuthorisationID}
```


#### Description
Submit a previously setup single immediate payment


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**PaymentAuthorisationID**  <br>*required*|ASPSP authorisation identifier for the payment|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Payment executed or ready for scheme to execute.|[Payment submit PATCH 200 response](#payment-submit-patch-200-response)|
|**202**|Payment execution instruction accepted.|[Payment submit PATCH 202 response](#payment-submit-patch-202-response)|
|**400**|Bad Request|[HTTP 400 Error](#http-400-error)|
|**401**|Unauthorized|[HTTP 401 Error](#http-401-error)|
|**403**|Forbidden|[Payment submit PATCH 403 response](#payment-submit-patch-403-response)|
|**409**|Conflict|[Payment submit PATCH 409 response](#payment-submit-patch-409-response)|
|**500**|Internal Server Error|[HTTP 500 Error](#http-500-error)|

<a name="payment-submit-patch-200-response"></a>
**Payment submit PATCH 200 response**

|Name|Description|Schema|
|---|---|---|
|**PaymentReferenceID**  <br>*optional*|Payment Reference ID  <br>**Length** : `1 - 35`|string|
|**PaymentStatus**  <br>*required*||enum (AwaitingExecution, InProgress, Debited, AwaitingFurtherAuthorisation, CreditSent, CreditDelivered, CreditApplied, CreditRejected)|
|**PaymentStatusDescription**  <br>*required*||enum (Queued for processing by debtor bank – outcome unknown, Payment being processed by debtor bank – outcome unknown, Debit applied to debtor account, awaiting send to scheme, The payment failed, credit will never be applied at the beneficiary, Multi-party authorisation is required for the payment, Payment sent to scheme, Payment arrived at beneficiary bank, The credit has been applied at the beneficiary bank, The credit was rejected at the beneficiary bank)|

<a name="payment-submit-patch-202-response"></a>
**Payment submit PATCH 202 response**

|Name|Description|Schema|
|---|---|---|
|**PaymentReferenceID**  <br>*optional*|Payment Reference ID  <br>**Length** : `1 - 35`|string|
|**PaymentStatus**  <br>*required*||enum (InstructionReceived)|
|**PaymentStatusDescription**  <br>*required*||enum (Payment execution instruction accepted.)|

<a name="http-400-error"></a>
**HTTP 400 Error**

|Name|Schema|
|---|---|
|**description**  <br>*required*|enum (The request could not be understood by the server due to malformed syntax. The client SHOULD NOT repeat the request without modifications.)|
|**status**  <br>*required*|enum (400)|
|**title**  <br>*required*|enum (BadRequest)|

<a name="http-401-error"></a>
**HTTP 401 Error**

|Name|Schema|
|---|---|
|**description**  <br>*required*|enum (The request requires user authentication.)|
|**status**  <br>*required*|enum (401)|
|**title**  <br>*required*|enum (Unauthorised)|

<a name="payment-submit-patch-403-response"></a>
**Payment submit PATCH 403 response**

|Name|Schema|
|---|---|
|**description**  <br>*required*|enum (The payer sort code is not valid - is closed, does not exist, or is not valid for the scheme., The payer account is not valid - is closed, does not exist, or is not valid for the scheme., The payee sort code is not valid - is closed, does not exist, or is not valid for the scheme., The payee account is not valid - is closed, does not exist, or is not valid for the scheme., The amount is not valid - exceeds scheme limit., The date is too far in the future., The scheme has rejected payment for an unspecified reason., The sending institution has rejected payment for an unspecified reason., The receiving institution has rejected payment for an unspecified reason.)|
|**status**  <br>*required*|enum (403)|
|**title**  <br>*required*|enum (InvalidPayerSortCode, InvalidPayerAccount, InvalidPayeeSortCode, InvalidPayeeAccount, InvalidAmount, InvalidExecutionDate, SchemeReject, SendingInstitutionReject, ReceivingInstitutionReject)|

<a name="payment-submit-patch-409-response"></a>
**Payment submit PATCH 409 response**

|Name|Schema|
|---|---|
|**description**  <br>*required*|enum (The sending institution has rejected payment for an unspecified reason.)|
|**status**  <br>*required*|enum (409)|
|**title**  <br>*required*|enum (SendingInstitutionReject)|

<a name="http-500-error"></a>
**HTTP 500 Error**

|Name|Schema|
|---|---|
|**description**  <br>*required*|enum (The server encountered an unexpected condition which prevented it from fulfilling the request.)|
|**status**  <br>*required*|enum (500)|
|**title**  <br>*required*|enum (InternalServerError)|


#### Consumes

* `application/prs.openbanking.rwdata.v0.1+json`


#### Produces

* `application/prs.openbanking.rwdata.v0.1+json`


#### Tags

* Payments


#### Security

|Type|Name|Scopes|
|---|---|---|
|**oauth2**|**[PSUOAuth2Security](#psuoauth2security)**|payment|


***

<a name="getpaymentstatus"></a>
### Get the status of a payment
```
GET /payments/{PaymentAuthorisationID}/status
```


#### Description
Get status of a previously submitted  payment


#### Parameters

|Type|Name|Description|Schema|
|---|---|---|---|
|**Path**|**PaymentAuthorisationID**  <br>*required*|ASPSP authorisation identifier for the payment|string|


#### Responses

|HTTP Code|Description|Schema|
|---|---|---|
|**200**|Payment Status Response|[Payment status GET 200 response](#payment-status-get-200-response)|

<a name="payment-status-get-200-response"></a>
**Payment status GET 200 response**

|Name|Description|Schema|
|---|---|---|
|**PaymentReferenceID**  <br>*optional*|Payment Reference ID  <br>**Length** : `1 - 35`|string|
|**PaymentStatus**  <br>*required*||enum (AwaitingExecution, InProgress, Debited, AwaitingFurtherAuthorisation, CreditSent, CreditDelivered, CreditApplied, CreditRejected)|
|**PaymentStatusDescription**  <br>*required*||enum (Queued for processing by debtor bank – outcome unknown, Payment being processed by debtor bank – outcome unknown, Debit applied to debtor account, awaiting send to scheme, The payment failed, credit will never be applied at the beneficiary, Multi-party authorisation is required for the payment, Payment sent to scheme, Payment arrived at beneficiary bank, The credit has been applied at the beneficiary bank, The credit was rejected at the beneficiary bank)|


#### Produces

* `application/prs.openbanking.rwdata.v0.1+json`


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



