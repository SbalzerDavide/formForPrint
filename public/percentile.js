// window.getExpectedMeans = function(ga){
//   let a = 4.956737 + 0.0005019687 * ga ** 3 - 0.0001227065 * ga ** 3 * Math.log(ga);
//   return a;
// }


// window.getCV = function(ga){
//   let a = 0.0001 *(-6.997171 +0.057559 * ga ** 3 - 0.01493946 * ga ** 3 * Math.log(ga))
//   return a;
// }

// window.getSkewness = function(ga){
//   let a = -4.257629 - 2162.234 * ga ** -2 + 0.0002301829 * ga ** 3;
//   return a;
// }

// window.getZScore = function(sk, cv, lnEfw, eX){
//   let a;
//   if(sk == 0){
//     a = cv ** -1 * Math.log(lnEfw / eX)
//   } else{
//     a = ((cv * sk) ** -1) * (-1 + ((lnEfw / eX) ** sk))
//   }
//   return a;
// }