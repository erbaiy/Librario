// // @ts-ignore
// import { Amplify } from 'aws-amplify';

// Amplify.configure({
//   Auth: {
//     Cognito: {
//       //required
//       userPoolId: 'us-east-1_PVnm5MlEp',
//       userPoolClientId: '23f7ejt0s16je8297jbm7an9om',
      
//       // optional
//       region: 'us-east-1',
//       signUpVerificationMethod: 'code',
//       loginWith: {
//         email: true,
//         username: false,
//         phone: false
//       },
//       userAttributes: {
//         email: {
//           required: true,
//           // @ts-ignore
//           mutable: true
//         },
//         name: {
//           required: true,
//           // @ts-ignore
//           mutable: true
//         }
//       }
//     }
//   }
// });



// @ts-ignore
import { Amplify } from 'aws-amplify';

const config = {
  Auth: {
    Cognito: {
      //required
      userPoolId: 'us-east-1_PVnm5MlEp',
      userPoolClientId: '23f7ejt0s16je8297jbm7an9om',
      
      // optional
      region: 'eu-north-1',
      signUpVerificationMethod: 'code',
      loginWith: {
        email: true,
        username: false,
        phone: false
      },
      userAttributes: {
        email: {
          required: true,
          // @ts-ignore
          mutable: true
        },
        name: {
          required: true,
          // @ts-ignore
          mutable: true
        }
      }
    }
  }
};

Amplify.configure(config);

export default config;

// // @ts-ignore
// import { Amplify } from 'aws-amplify';

// const config = {
//   Auth: {
//     Cognito: {
//       //required
//       userPoolId: 'us-east-1_PVnm5MlEp',
//       userPoolClientId: '23f7ejt0s16je8297jbm7an9om',
      
//       // optional
//       region: 'us-east-1',
//       signUpVerificationMethod: 'code',
//       loginWith: {
//         email: true,
//         username: false,
//         phone: false
//       },
//       userAttributes: {
//         email: {
//           required: true,
//           // @ts-ignore
//           mutable: true
//         },
//         name: {
//           required: true,
//           // @ts-ignore
//           mutable: true
//         }
//       }
//     }
//   }
// };

// Amplify.configure(config);

// export default config;
