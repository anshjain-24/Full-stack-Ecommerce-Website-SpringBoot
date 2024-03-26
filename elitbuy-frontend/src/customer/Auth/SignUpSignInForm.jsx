// import React, { useState } from 'react';
// import './Auth_style.css';

// const SignUpSignInForm = () => {
//  const [isSignUp, setIsSignUp] = useState(true);

//  const toggleForm = () => {
//     setIsSignUp(!isSignUp);
//  };

//  return (
//     <div id="container" className={`container ${isSignUp ? 'sign-in' : 'sign-up'}`}>
//       <div className="row">
//         <div className="col align-items-center flex-col sign-up">
//           <div className="form-wrapper align-items-center">
//             <div className="form sign-up">
//               <div className="input-group">
//                 <i className='bx bxs-user'></i>
//                 <input type="text" placeholder="Username" />
//               </div>
//               <div className="input-group">
//                 <i className='bx bx-mail-send'></i>
//                 <input type="email" placeholder="Email" />
//               </div>
//               <div className="input-group">
//                 <i className='bx bxs-lock-alt'></i>
//                 <input type="password" placeholder="Password" />
//               </div>
//               <div className="input-group">
//                 <i className='bx bxs-lock-alt'></i>
//                 <input type="password" placeholder="Confirm password" />
//               </div>
//               <button>
//                 Sign up
//               </button>
//               <p>
//                 <span>
//                  Already have an account?
//                 </span>
//                 <b onClick={toggleForm} className="pointer">
//                  Sign in here
//                 </b>
//               </p>
//             </div>
//           </div>
//         </div>
//         <div className="col align-items-center flex-col sign-in">
//           <div className="form-wrapper align-items-center">
//             <div className="form sign-in">
//               <div className="input-group">
//                 <i className='bx bxs-user'></i>
//                 <input type="text" placeholder="Username" />
//               </div>
//               <div className="input-group">
//                 <i className='bx bxs-lock-alt'></i>
//                 <input type="password" placeholder="Password" />
//               </div>
//               <button>
//                 Sign in
//               </button>
//               <p>
//                 <b>
//                  Forgot password?
//                 </b>
//               </p>
//               <p>
//                 <span>
//                  Don't have an account?
//                 </span>
//                 <b onClick={toggleForm} className="pointer">
//                  Sign up here
//                 </b>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       {/* Content section omitted for brevity */}
//     </div>
//  );
// };

// export default SignUpSignInForm;
