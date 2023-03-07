window.getExpectedMeans = function(ga){
  let a = 4.956737 + 0.0005019687 * ga ** 3 - 0.0001227065 * ga ** 3 * Math.log(ga);
  return a;
  // return Number.parseFloat(a).toFixed(2);
}


window.getCV = function(ga){
  let a = 0.0001 *(-6.997171 +0.057559 * ga ** 3 - 0.01493946 * ga ** 3 * Math.log(ga))
  return a;
  //return Number.parseFloat(a).toFixed(2);
}

window.getSkewness = function(ga){
  let a = -4.257629 - 2162.234 * ga ** -2 + 0.0002301829 * ga ** 3;
  return a;
  // return Number.parseFloat(a).toFixed(2);
}
window.getZScore = function(sk, cv, lnEfw, eX){
  let a;
  if(sk == 0){
    a = cv ** -1 * Math.log(lnEfw / eX)
  } else{
    a = ((cv * sk) ** -1) * (-1 + ((lnEfw / eX) ** sk))
  }
  return a;
  //return Number.parseFloat(a).toFixed(2);
}
// let ga = 30;
// let eX = window.getExpectedMeans(ga);
// let cv = window.getCV(ga);
// let sk = window.getSkewness(ga);
// let efw = 1119;
// let lnEfw = Math.log(efw)
// let zScore = window.getZScore(sk, cv, lnEfw, eX)


// per calcolare il percentile alla fine 
// DISTRIB.NORM(zScore;0;1;VERO)×100





