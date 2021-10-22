const express = require('express');
const router = express.Router();
const servicestatus = require('./serviceStatusRoutes');
const accounts = require('./accountsRoutes');
const jws = require('jws');
const config = require('../config');

router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/public/index.html'));
});

router.use('/servicestatus', servicestatus);
router.use('/accounts', accounts);
router.get('/payment', (request, response) => {
  const key = config.api.digitalSignatureKey;
  console.log(typeof key);
  const signature = jws.sign({
    header: { alg: 'RS256' },
    payload: `{
      "paymentMethod": "TRF",
      "paymentTypeInformation": {
        "serviceLevelCode": "NURG",
        "localInstrument": {
          "code": "CCD"
        }
      },
      "requestedExecutionDate": "2020-03-11",
      "debtor": {
        "name": "Test Name",
        "postalAddress": {
          "country": "US"
        },
        "organizationId": {
          "other": [
            {
              "id": "4192662001",
              "schemeName": {
                "proprietary": "JPMCOID"
              }
            }
          ]
        }
      },
      "debtorAccount": {
        "accountNumber": "945958726",
        "currency": "USD"
      },
      "debtorAgent": {
        "aba": "021000021",
        "country": "US"
      },
      "creditTransferTransactionInformation": {
        "endToEndId": "E2E001",
        "amount": {
          "instructedAmount": {
            "currency": "USD",
            "amount": 101.39
          }
        },
        "creditorAgent": {
          "financialInstitutionId": {
            "aba": "021000021",
            "postalAddress": {
              "country": "US"
            }
          }
        },
        "creditor": {
          "name": "SAMPLE CREDITOR",
          "postalAddress": {
            "country": "US"
          }
        },
        "creditorAccount": {
          "accountNumber": "945958759"
        }
      }
    }`,
    privateKey: key,
  });
  return response.status(200).send(signature);
});

module.exports = router;
