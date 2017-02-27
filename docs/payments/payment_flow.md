
Title OAuth 2.0 Payment Initiation Flow

Customer -> PISP: Check out
note right of PISP
    All comms between PISP and ASPSP are under TLS 1.2 MA
end note


par: payment initialisation

PISP -> ASPSP Token End-point: client credentials grant (client id, client secret, scope)
note right of PISP
    scope = "INITIATE_PAYMENT"
end note

ASPSP Token End-point -> PISP: Access Token

note over PISP, ASPSP Resource Server
    PISP is reponsible for generating their own unique end to end ID
    which will eventually be passed downstream to the 
    beneficary/originating banks
end note
PISP -> ASPSP Resource Server: Initiate Payment (payee account details, amount, EndtoEndId ...)
ASPSP Resource Server -> PISP: Payment Reference ID/blob
note right of ASPSP Resource Server
    The payment reference is opaque to everyone other than the ASPSP.
    Format is not standardised and ASPSPs are free to embed additional data in it.
    Must be unique and could potentially be part of a JWT token
    Message is signed using the same cert
end note

end par

par: payment authorisation

PISP -> Customer: HTTP 302 (Params in RFC6749 - 4.1.1, Payment Reference Blob)
ASPSP Authorization End-point ->Customer:  notify customer, other mean of communication (optional)
par: competitive space
Customer -> ASPSP Authorization End-point: Follow Redirect
ASPSP Authorization End-point -> Customer: Authentication challenge
Customer -> ASPSP Authorization End-point: Authentication response

ASPSP Authorization End-point -> Customer: Consent request
Customer -> ASPSP Authorization End-point: Consent response

note left of ASPSP Authorization End-point
    Updates the state of the payment blob

end note

end par

ASPSP Authorization End-point -> Customer: Redirect (302) (Authorization Code)

Customer -> PISP: Follow redirect (Authorization code)

PISP -> ASPSP Token End-point: /token
ASPSP Token End-point -> PISP: Access Token, Refresh Token

note left of ASPSP Token End-point
     - Access token at this stage is bound to the Payment Reference Blob
     - Access token is opaque to other parties
     - TODO: How long is the access & refresh token valid ?
end note

end par

par: payment execution

PISP -> Resource Server: Make payment (access token)
Resource Server -> PISP: {..}

note left of Resource Server
    Response to the call is idempotent
end note

end par

par: payment status check

PISP -> Resource Server: Check status (access token)
Resource Server -> PISP: DEBITED

end par
PISP->Customer: Ship goods
