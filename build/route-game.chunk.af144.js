(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{UQ27:function(e){e.exports={darker:"darker__3FUDV",square:"square__2d7yg",selected2:"selected2__215Pa",fadeIt:"fadeIt__2Id_H",selected:"selected__1JKN2"}},fajk:function(){},s3F4:function(e,t,r){"use strict";function a(e,t,r,a){for(var n=t?2:1,o=0;o<8;o+=1)for(var i=0;i<8;i+=1)e[o][i][5]=e[o][i][0]===n?u(o,i,t,e,!1,!1,[0],r,a):[];return e}function n(e,t,r){var a=0,n=0,o=0,i=[0],s=[0],l=0,c=0;void 0===r&&(r=h(e,!t));var f=1;if(t&&(f=2),t&&e[4][0][3]){var v=!1;e[0][0][3]&&(a+=3,v=!0,0===e[3][0][0]&&(a+=1),0===e[2][0][0]&&(a+=3),0===e[1][0][0]&&(a+=1),2===e[2][1][0]&&(a+=1,1===e[2][1][1]&&(a+=4)),2===e[1][1][0]&&(a+=1,1===e[1][1][1]&&(a+=4)),2===e[0][1][0]&&(a+=1,1===e[0][1][1]&&(a+=4))),e[7][0][3]&&(v=!0,n+=3,0===e[6][0][0]&&(n+=1),0===e[5][0][0]&&(n+=3),2===e[7][1][0]&&(n+=1,1===e[7][1][1]&&(n+=4)),2===e[6][1][0]&&(n+=1,1===e[6][1][1]&&(n+=4)),2===e[5][1][0]&&(n+=1,1===e[5][1][1]&&(n+=4))),v&&(1===e[3][1][1]&&2===e[3][1][0]&&(a-=6),1===e[4][1][1]&&2===e[4][1][0]&&(n-=6),2===e[2][0][1]&&2===e[2][0][0]&&(a-=6),2===e[5][0][1]&&2===e[5][0][0]&&(n-=6))}!t&&e[4][7][3]&&(v=!1,e[0][7][3]&&(v=!0,a+=3,0===e[3][7][0]&&(a+=1),0===e[2][7][0]&&(a+=3),0===e[1][7][0]&&(a+=1),1===e[2][6][0]&&(a+=1,1===e[2][6][1]&&(a+=4)),1===e[1][6][0]&&(a+=1,1===e[1][6][1]&&(a+=4)),1===e[0][6][0]&&(a+=1,1===e[0][6][1]&&(a+=4))),e[7][7][3]&&(v=!0,n+=3,0===e[6][7][0]&&(n+=1),0===e[5][7][0]&&(n+=3),1===e[7][6][0]&&(n+=1,1===e[7][6][1]&&(n+=4)),1===e[6][6][0]&&(n+=1,1===e[6][6][1]&&(n+=4)),1===e[5][6][0]&&(n+=1,1===e[5][6][1]&&(n+=4))),v&&(1===e[3][6][1]&&1===e[3][6][0]&&(a-=4),1===e[4][6][1]&&1===e[4][6][0]&&(n-=4),2===e[2][7][1]&&1===e[2][7][0]&&(a-=4),2===e[5][7][1]&&1===e[5][7][0]&&(n-=4)));for(var d=0,m=0;m<8;m+=1)for(var _=0;_<8;_+=1)e[m][_][0]===f?(c+=(7-Math.abs(r[0]-m)+(7-Math.abs(r[1]-_)))*e[m][_][1],u(m,_,t,e,!0,!0,i),e[m][_][2]>d&&(d=e[m][_][2]),l+=t?_:7-_,o+=e[m][_][1]):0!==e[m][_][0]&&(u(m,_,!t,e,!0,!0,s).length-2,l-=t?(7-_)/10:_/10,o-=e[m][_][1]);return[o,i[0],s[0],a,n,0,l,d,c]}function o(e,t,r,a,n){var o=t?2:1,i=[];r&&(t=!t);for(var s=[0],h=0;h<8;h+=1)for(var l=0;l<8;l+=1)e[h][l][0]===o&&u(h,l,t,e,!n,!0,s).forEach((function(e){i[i.length]=[h,l,e[0],e[1]]}));return i}function i(e,t){var r=1;t&&(r=2);var a=0;return o(e,t,!0).forEach((function(t){e[t[2]][t[3]][0]===r&&(e[t[2]][t[3]][6]=!0,a+=9===e[t[0]][t[1]][1]?2*(9-e[t[2]][t[3]][1]):9-e[t[2]][t[3]][1])})),a}function s(e,t){return i(e,t)-i(e,!t)}function h(e,t){var r=1;t&&(r+=1);for(var a=0;a<8;a+=1)for(var n=0;n<8;n+=1)if(9===e[a][n][1]&&e[a][n][0]===r)return[a,n]}function u(e,t,r,a,n,o,i,s,h){void 0===i&&(i=[0]);var u=a[e][t][1],c=[];switch(u){case 1:c=m(e,t,r,a,i);break;case 2:c=d(e,t,r,a,i);break;case 3:c=p(e,t,r,a,i);break;case 4:c=v(e,t,r,a,i);break;case 5:c=function(e,t,r,a,n){void 0===n&&(n=[0]);var o=[],i=e+1,s=t+1;for(;l(n,o,i,s,a,r,5);)i+=1,s+=1;i=e-1,s=t-1;for(;l(n,o,i,s,a,r,5);)i-=1,s-=1;i=e+1,s=t-1;for(;l(n,o,i,s,a,r,5);)i+=1,s-=1;i=e-1,s=t+1;for(;l(n,o,i,s,a,r,5);)i-=1,s+=1;i=e+1;for(;l(n,o,i,t,a,r,5);)i+=1;i=e-1;for(;l(n,o,i,t,a,r,5);)i-=1;i=t+1;for(;l(n,o,e,i,a,r,5);)i+=1;i=t-1;for(;l(n,o,e,i,a,r,5);)i-=1;return o}(e,t,r,a,i);break;case 9:c=_(e,t,r,a,i)}if(void 0!==h&&c.forEach((function(r){h[h.length]=k(e,t,r[0],r[1])})),!n){for(var f=c.length-1;f>=0;f-=1)D(T(k(e,t,c[f][0],c[f][1]),a,o),r)&&c.splice(f,1);if(9===u&&a[e][t][3]){if(D(a,r))for(var g=c.length-1;g>=0;g-=1)c[g][1]!==t||c[g][0]!==e-2&&c[g][0]!==e+2||c.splice(g,1);var w=!0,b=!0;for(f=c.length-1;f>=0;f-=1)c[f][1]===t&&c[f][0]===e-1&&(w=!1),c[f][1]===t&&c[f][0]===e+1&&(b=!1);for(f=c.length-1;f>=0;f-=1)c[f][1]===t&&(c[f][0]===e-2&&w||c[f][0]===e+2&&b)&&c.splice(f,1)}}return c}function l(e,t,r,a,n,o,i){if(3===y(r,a,n)[0])return!1;var s=n[r][a];if(s[0]===(o?2:1))return!1;if(t[t.length]=[r,a,s[1]],0===s[0])return!0;var h=s[1];return s[6]&&(h-=i),e[0]<h&&(e[0]=h),!1}function c(e,t,r,a,n){0===n[r][a][0]&&(t[t.length]=[r,a,0])}function f(e,t,r,a,n,o){var i=o?1:2;if(r>0&&n[r-1][a][0]===i&&(t[t.length]=[r-1,a,n[r-1][a][1]]),r<7&&n[r+1][a][0]===i&&(t[t.length]=[r+1,a,n[r+1][a][1]]),0===n[r][a][0])return t[t.length]=[r,a,0],!0}function v(e,t,r,a,n){void 0===n&&(n=[0]);for(var o=[],i=e+1;l(n,o,i,t,a,r,4);)i+=1;for(i=e-1;l(n,o,i,t,a,r,4);)i-=1;for(i=t+1;l(n,o,e,i,a,r,4);)i+=1;for(i=t-1;l(n,o,e,i,a,r,4);)i-=1;return o}function d(e,t,r,a,n){void 0===n&&(n=[0]);for(var o=[],i=e+1,s=t+1;l(n,o,i,s,a,r,2);)i+=1,s+=1;for(i=e-1,s=t-1;l(n,o,i,s,a,r,2);)i-=1,s-=1;for(i=e+1,s=t-1;l(n,o,i,s,a,r,2);)i+=1,s-=1;for(i=e-1,s=t+1;l(n,o,i,s,a,r,2);)i-=1,s+=1;return o}function m(e,t,r,a,n){var o=[];return r?(f(0,o,e,t+1,a,!0)&&1===t&&c(0,o,e,t+2,a),e>0&&a[e-1][t][3]&&l(n,o,e-1,t+1,a,!0,1),e<7&&a[e+1][t][3]&&l(n,o,e+1,t+1,a,!0,1),o):(f(0,o,e,t-1,a,!1)&&6===t&&c(0,o,e,t-2,a),e>0&&a[e-1][t][3]&&l(n,o,e-1,t-1,a,!1,1),e<7&&a[e+1][t][3]&&l(n,o,e+1,t-1,a,!1,1),o)}function _(e,t,r,a,n){var o=[];return l(n,o,e+1,t+1,a,r,9),l(n,o,e-1,t+1,a,r,9),l(n,o,e+1,t-1,a,r,9),l(n,o,e-1,t-1,a,r,9),l(n,o,e+1,t,a,r,9),l(n,o,e-1,t,a,r,9),l(n,o,e,t+1,a,r,9),l(n,o,e,t-1,a,r,9),a[e][t][3]&&(a[0][t][3]&&0===a[1][t][0]&&0===a[2][t][0]&&0===a[3][t][0]&&l(n,o,2,t,a,r,9),a[7][t][3]&&0===a[5][t][0]&&0===a[6][t][0]&&l(n,o,6,t,a,r,9)),o}function p(e,t,r,a,n){var o=[];return l(n,o,e+1,t+2,a,r,3),l(n,o,e+1,t-2,a,r,3),l(n,o,e-1,t+2,a,r,3),l(n,o,e-1,t-2,a,r,3),l(n,o,e+2,t+1,a,r,3),l(n,o,e+2,t-1,a,r,3),l(n,o,e-2,t+1,a,r,3),l(n,o,e-2,t-1,a,r,3),o}function g(e){for(var t=[],r=0;r<8;r+=1)for(var a=0;a<8;a+=1){var n=10*~~e[r][a][0]+~~e[r][a][1]+55;n<65&&(n=65),t[8*r+a]=String.fromCharCode(n)}return t.join("")}function w(e,t){var r=e[t[0]][t[1]],a=(String(r[1]),e[t[2]][t[3]][0].toString()+e[t[2]][t[3]][1]);return 1===r[1]&&t[0]!==t[2]&&"00"===a&&(a=1===r[0]?"21":"11"),r[0].toString()+r[1]+function(e,t,r,a){return String.fromCharCode(97+e)+(t+1)+String.fromCharCode(97+r)+(a+1)}(t)+a}function b(e,t){var r=w(t.table,e);t.moves.push(r),t.table=T(e,t.table),t.wNext=!t.wNext,t.pollNum+=1,t.moveCount+=1,t.table=a(t.table,t.wNext);var n=g(t.table);return t.allPastTables.push(n),t}function D(e,t){var r=[],a=1;t&&(a+=1);for(var n=0;n<8;n+=1)for(var o=0;o<8;o+=1)if(9===e[n][o][1]&&e[n][o][0]===a){r=d(n,o,t,e,[0]);for(var i=0;i<r.length;i+=1)if(5===e[r[i][0]][r[i][1]][1]||2===e[r[i][0]][r[i][1]][1])return!0;r=v(n,o,t,e,[0]);for(i=0;i<r.length;i+=1)if(5===e[r[i][0]][r[i][1]][1]||4===e[r[i][0]][r[i][1]][1])return!0;r=p(n,o,t,e,[0]);for(i=0;i<r.length;i+=1)if(3===e[r[i][0]][r[i][1]][1])return!0;if(t?o<7:o>0){r=m(n,o,t,e,[0]);for(i=0;i<r.length;i+=1)if(1===e[r[i][0]][r[i][1]][1])return!0}r=_(n,o,t,e,[0]);for(i=0;i<r.length;i+=1)if(9===e[r[i][0]][r[i][1]][1])return!0}return!1}function T(e,t,r,a){if(void 0===a)a=[0];for(var n=[],o=0;o<8;o+=1){n[o]=new Array(8);for(var i=0;i<8;i+=1){n[o][i]=new Array(4);for(var s=0;s<4;s+=1)n[o][i][s]=t[o][i][s]}}if(9===n[e[0]][e[1]][1]&&n[e[0]][e[1]][3])switch(e[2]){case 2:switch(e[3]){case 0:n=T([0,0,3,0],n);break;case 7:n=T([0,7,3,7],n)}break;case 6:switch(e[3]){case 0:n=T([7,0,5,0],n);break;case 7:n=T([7,7,5,7],n)}}for(var h=0;h<8;h+=1)n[h][3][3]=!1,n[h][4][3]=!1;1===n[e[0]][e[1]][1]&&(1===e[1]&&3===e[3]||6===e[1]&&4===e[3])&&(n[e[0]][e[1]][3]=!0);return 1===n[e[0]][e[1]][1]&&0===n[e[2]][e[3]][0]&&e[0]!==e[2]&&(!0,n[e[2]][e[3]]=n[e[2]][e[1]],n[e[2]][e[1]]=[0,0,!1,!1,!1]),a[0]=n[e[2]][e[3]][1],1!==n[e[0]][e[1]][1]||7!==e[3]&&0!==e[3]||(n[e[0]][e[1]][1]=5,a[0]+=4),n[e[0]][e[1]][2]+=1,n[e[2]][e[3]]=n[e[0]][e[1]],n[e[0]][e[1]]=[0,0,0],1!==n[e[2]][e[3]][1]&&(n[e[2]][e[3]][3]=!1),n}function k(e,t,r,a){return[e,t,r,a]}function y(e,t,r){return e>=0&&t>=0&&e<=7&&t<=7?r[e][t]:[3]}function I(e,t,r,a,n,o,i,s,h,u){var l=function(e,t,r){return e>=0&&t>=0&&e<=7&&t<=7?r[e][t]:[0]}(r,a,o);return 0!==l[0]?(l[0]===n?(h[0]+=1,i[r][a]=!0):(u[8*r+a]=!0,s[s.length]=[e,t,r,a,o[e][t][1],o[r][a][1]]),!0):(u[8*r+a]=!0,!1)}function C(e,t,r,a,n,o,i,s,h,u){return!(r<0||r>7)&&(0!==o[r][a][0]?(o[r][a][0]===n?(h[0]+=1,i[r][a]=!0):(u[8*r+a]=!0,s[s.length]=[e,t,r,a,o[e][t][1],o[r][a][1]]),!0):(u[8*r+a]=!0,!1))}function N(e,t,r,a,n,o,i,s,h,u){var l=y(r,a,o);return 3!==l[0]&&(0===l[0]?(u[8*r+a]=!0,!0):(l[0]===n?(h[0]+=1,i[r][a]=!0):(u[8*r+a]=!0,s[s.length]=[e,t,r,a,o[e][t][1],o[r][a][1]]),!1))}function x(e,t){for(var r=new Array(8),a=0;a<8;a+=1){r[a]=new Array(8);for(var n=0;n<8;n+=1)r[a][n]=new Int8Array(2),r[a][n][0]=t[a][n][0],r[a][n][1]=t[a][n][1]}if(9===r[e[0]][e[1]][1]&&r[e[0]][e[1]][3])switch(e[2]){case 2:switch(e[3]){case 0:r=x([0,0,3,0],r);break;case 7:r=x([7,0,5,0],r)}break;case 7:switch(e[3]){case 0:r=x([0,7,3,7],r);break;case 7:r=x([7,7,5,7],r)}}return 1!==r[e[0]][e[1]][1]||7!==e[3]&&0!==e[3]||(r[e[0]][e[1]][1]=5),r[e[2]][e[3]]=r[e[0]][e[1]],r[e[0]][e[1]]=[0,0,0],r}function j(e,t,r,a,n,o,i,s){switch(a[e][t][1]){case 1:!function(e,t,r,a,n,o,i,s){if(2===n)return C(e,t,e+1,t+1,n,r,a,o,i,s),void C(e,t,e-1,t+1,n,r,a,o,i,s);C(e,t,e+1,t-1,n,r,a,o,i,s),C(e,t,e-1,t-1,n,r,a,o,i,s)}(e,t,a,n,r,o,i,s);break;case 2:!function(e,t,r,a,n,o,i,s){for(var h=e+1,u=t+1;N(e,t,h,u,n,r,a,o,i,s);)h+=1,u+=1;for(h=e-1,u=t-1;N(e,t,h,u,n,r,a,o,i,s);)h-=1,u-=1;for(h=e-1,u=t+1;N(e,t,h,u,n,r,a,o,i,s);)h-=1,u+=1;for(h=e+1,u=t-1;N(e,t,h,u,n,r,a,o,i,s);)h+=1,u-=1}(e,t,a,n,r,o,i,s);break;case 3:!function(e,t,r,a,n,o,i,s){I(e,t,e+1,t+2,n,r,a,o,i,s),I(e,t,e+1,t-2,n,r,a,o,i,s),I(e,t,e-1,t+2,n,r,a,o,i,s),I(e,t,e-1,t-2,n,r,a,o,i,s),I(e,t,e+2,t+1,n,r,a,o,i,s),I(e,t,e+2,t-1,n,r,a,o,i,s),I(e,t,e-2,t+1,n,r,a,o,i,s),I(e,t,e-2,t-1,n,r,a,o,i,s)}(e,t,a,n,r,o,i,s);break;case 4:!function(e,t,r,a,n,o,i,s){for(var h=e+1;N(e,t,h,t,n,r,a,o,i,s);)h+=1;for(h=e-1;N(e,t,h,t,n,r,a,o,i,s);)h-=1;for(h=t+1;N(e,t,e,h,n,r,a,o,i,s);)h+=1;for(h=t-1;N(e,t,e,h,n,r,a,o,i,s);)h-=1}(e,t,a,n,r,o,i,s);break;case 5:!function(e,t,r,a,n,o,i,s){for(var h=e+1;N(e,t,h,t,n,r,a,o,i,s);)h+=1;for(h=e-1;N(e,t,h,t,n,r,a,o,i,s);)h-=1;for(h=t+1;N(e,t,e,h,n,r,a,o,i,s);)h+=1;for(h=t-1;N(e,t,e,h,n,r,a,o,i,s);)h-=1;h=e+1;for(var u=t+1;N(e,t,h,u,n,r,a,o,i,s);)h+=1,u+=1;for(h=e-1,u=t-1;N(e,t,h,u,n,r,a,o,i,s);)h-=1,u-=1;for(h=e-1,u=t+1;N(e,t,h,u,n,r,a,o,i,s);)h-=1,u+=1;for(h=e+1,u=t-1;N(e,t,h,u,n,r,a,o,i,s);)h+=1,u-=1}(e,t,a,n,r,o,i,s);break;case 9:!function(e,t,r,a,n,o,i,s){I(e,t,e+1,t,n,r,a,o,i,s),I(e,t,e-1,t,n,r,a,o,i,s),I(e,t,e+1,t+1,n,r,a,o,i,s),I(e,t,e-1,t+1,n,r,a,o,i,s),I(e,t,e+1,t-1,n,r,a,o,i,s),I(e,t,e-1,t-1,n,r,a,o,i,s),I(e,t,e,t+1,n,r,a,o,i,s),I(e,t,e,t-1,n,r,a,o,i,s),r[e][t][3]&&(r[0][t][3]&&0===r[1][t][0]&&0===r[2][t][0]&&0===r[3][t][0]&&I(e,t,2,t,n,r,a,o,i,s),r[7][t][3]&&0===r[5][t][0]&&0===r[6][t][0]&&I(e,t,6,t,n,r,a,o,i,s))}(e,t,a,n,r,o,i,s)}}function O(e,t,r,a,n){var o=1,i=1,s=1;switch(n&&n.modType){case"fwV":o=n.modConst;break;case"bHK":i=n.modConst;break;case"hKM":s=n.modConst}var h,u,l=0,c=[],f=[],v=new Uint8Array(1),d=new Uint8Array(1),m=0,_=0,p=0,g=0,w=[new Uint8Array(8),new Uint8Array(8),new Uint8Array(8),new Uint8Array(8),new Uint8Array(8),new Uint8Array(8),new Uint8Array(8),new Uint8Array(8)];t?(u=1,h=2):(h=1,u=2);for(var b={},D={},T=0;T<8;T+=1)for(var k=0;k<8;k+=1)e[T][k][0]===h?(1===e[T][k][1]&&(l+=1===h?7-k:k),j(T,k,h,e,w,c,v,b)):0!==e[T][k][0]&&(1===e[T][k][1]&&(l-=1===u?7-k:k),j(T,k,u,e,w,f,d,9===e[T][k][1]?D:{}));c.forEach((function(e){var t=0;(t=w[e[2]][e[3]]?e[5]-e[4]:e[5])>p&&(p=t,e),m+=t})),f.forEach((function(e){var t=0;(t=w[e[2]][e[3]]?e[5]-e[4]:e[5])>g&&(g=t),_+=t}));var y=v[0]-d[0],I=m-_,C=Object.keys(D),N=8-C.length,x=C.reduce((function(e,t){return b[t]?e+1:e}),0);l*=1*o,N*=1*s,x*=1*i;var O=new Int32Array(1);return O[0]=65536*p-4096*g,r?O[0]-=(y<<8)+(I<<4)+l+(N<<9)+(x<<10):O[0]+=(y<<8)+(I<<4)+l+(N<<9)+(x<<10),O}function A(e,t){var r=[],n=!e.wNext;if(2===e.depth&&D(e.table,n)&&(r=[new R(e.table,n,e.depth+1,e.moveTree,e.desiredDepth,100,e.wPlayer,!1,e.gameNum,e.mod,e.shouldIDraw)]),e.trItm)E(e.depth,t);else if(e.depth>e.desiredDepth)t[e.depth][t[e.depth].length]=new $(e.score,e.moveTree,e.wPlayer);else{var o=1&e.depth;if(e.depth===e.desiredDepth){var i;i=o?(e.score<<16)-O(e.table,e.wNext,!1,0,e.mod)[0]:(e.score<<16)+O(e.table,e.wNext,!0,0,e.mod)[0],r[r.length]=new R([],n,e.depth+1,e.moveTree,e.desiredDepth,i,e.wPlayer,!1,e.gameNum,e.mod,e.shouldIDraw)}else{var s=[];a(e.table,e.wNext,!0,s);for(var h=s.length-1;h>=0;h-=1){var u,l=s[h];u=x(l,e.table);var c,f=e.table[l[2]][l[3]][1],v=e.moveTree.concat([l,c=o?e.score-f:e.score+f]);r[r.length]=new R(u,n,e.depth+1,v,e.desiredDepth,c,e.wPlayer,!1,e.gameNum,e.mod,e.shouldIDraw)}}r[r.length]=new ee(e.depth+1,e.moveTree,e.wPlayer)}return r}function P(e,t){var r=e.progress,a=(new Date).getTime();t&&(e={desiredDepth:e.desiredDepth,smallDeepeningTasks:[e],wPlayer:e.wPlayer,mod:e.mod,shouldIDraw:e.shouldIDraw});for(var n=[],o=e.desiredDepth+2,i=0;i<o;i+=1)n[i]=[];for(;e.smallDeepeningTasks.length>0;)for(var s=A(e.smallDeepeningTasks.pop(),n),h=s.length-1;h>=0;h-=1)e.smallDeepeningTasks[e.smallDeepeningTasks.length]=s[h];var u=(new Date).getTime()-a,l={gameNum:e.gameNum,progress:r,timeItTook:u,score:n[2][0].value,moveTree:n[2][0].moveTree};return!0!==t&&(l.score=n[1][0].value),l}function S(e,t,r,a){var n=function e(t){var r;if(null===t||"object"!=typeof t)return t;if(t instanceof Date)return(r=new Date).setTime(t.getTime()),r;if(t instanceof Array){r=[];for(var a=0,n=t.length;a<n;a+=1)r[a]=e(t[a]);return r}if(t instanceof Object){for(var o in r={},t)t.hasOwnProperty(o)&&(r[o]=e(t[o]));return r}throw new Error("Unable to copy obj! Its type isn't supported.")}(e);n.moveTask=new z(n,a),n.moveTask.sharedData.desiredDepth=t;var o=new Y(n).movesToSend;o.forEach((function(e){e.progress={moveCoords:e.moveCoords,moveIndex:e.moveIndex,done:!1,result:{},expected:void 0}}));var i=[];o.forEach((function(e){var t=new Z(e);!function(e){for(var t=e.smallDeepeningTasks.pop(),r=A(t,t.resolverArray);r.length>0;){var a=r.pop();e.smallDeepeningTasks[e.smallDeepeningTasks.length]=a}e.smallDeepeningTasksCopy=e.smallDeepeningTasks.slice(),e.resolverArray=[]}(t);for(var r=[];t.smallDeepeningTasks.length>1;){var a=t.smallDeepeningTasks.pop();a.progress=t.progress;var o=P(a,!0);o.value=o.score,r[r.length]=o}var s=[];s[1]=[],s[2]=r,s[3]=[],E(2,s);var h,u=s[1][0],l=u.moveTree[0];if(!n.moveTask.shouldIDraw){var c=T(l,n.table);h=Q.checkIfLooped(c,n.allPastTables)}h&&(u.value-=Math.pow(h,5)),u.score=u.value,u.move=l,i[i.length]=u})),i.sort((function(e,t){return e.score<t.score?1:e.score===t.score?0:-1}));var s={result:i,winningMove:i[0],moveCoords:i[0].moveTree[0]};return r&&r(s),s}function E(e,t){if(t[e].length>0){var r=t[e-1];r[r.length]=t[e].reduce(1&e?function(e,t){return t.value>e.value?{value:t.value,moveTree:t.moveTree}:{value:e.value,moveTree:e.moveTree}}:function(e,t){return t.value<e.value?{value:t.value,moveTree:t.moveTree}:{value:e.value,moveTree:e.moveTree}})}t[e]=[]}function M(e,t){J.options.__h&&J.options.__h(L,e,re||t),re=0;var r=L.__H||(L.__H={__:[],__h:[]});return e>=r.__.length&&r.__.push({}),r.__[e]}function H(e){return re=1,function(e,t,r){var a=M(K++,2);return a.t=e,a.__c||(a.__=[r?r(t):W(void 0,t),function(e){var t=a.t(a.__[0],e);a.__[0]!==t&&(a.__=[t,a.__[1]],a.__c.setState({}))}],a.__c=L),a.__}(W,e)}function U(){ae.forEach((function(e){if(e.__P)try{e.__H.__h.forEach(V),e.__H.__h.forEach(F),e.__H.__h=[]}catch(t){e.__H.__h=[],J.options.__e(t,e.__v)}})),ae=[]}function V(e){var t=L;"function"==typeof e.__c&&e.__c(),L=t}function F(e){var t=L;e.__c=e.__(),L=t}function W(e,t){return"function"==typeof t?t(e):t}function q(){return(q=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}r.r(t);var K,L,G,J=r("hosL"),B=(r("ox/y"),r("fajk"),Object(J.createContext)("test")),Q={getPieceValues:function(e){var t={wVal:0,bVal:0};return e.table.forEach((function(e){e.forEach((function(e){switch(e[0]){case 1:t.bVal+=e[1];break;case 2:t.wVal+=e[1]}}))})),t},shouldIDraw:function(e){var t=this.getPieceValues(e);if(e.wNext){if(t.wVal<t.bVal)return!0}else if(t.wVal>t.bVal)return!0;return!1},checkIfLooped:function(e,t){var r=0,a=g(e);return t.forEach((function(e){e===a&&(r+=1)})),r}},z=function(e,t){this.id=Math.random();var r=Q.shouldIDraw(e);this.shouldIDraw=r,t&&(this.mod=t),this.sharedData={shouldIDraw:r,origWNext:e.wNext,desiredDepth:e.desiredDepth,oppKingPos:h(e.table,!e.wNext),origProtect:s(e.table,e.wNext),origData:n(e.table,e.wNext),origDeepDatatt:O(e.table,!0,!0,0,t),origDeepDatatf:O(e.table,!0,!1,0,t),origDeepDataft:O(e.table,!1,!0,0,t),origDeepDataff:O(e.table,!1,!1,0,t)},this.moveCoords=o(e.table,e.wNext,!1,0,!0);var a=!1;this.sharedData.origData[0]>1&&(a=!0),this.sharedData.dontLoop=a},R=function(e,t,r,a,n,o,i,s,h,u,l){this.gameNum=h,this.wPlayer=i,this.table=e,this.wNext=t,this.depth=r,this.moveTree=a,this.desiredDepth=n,this.score=o,this.mod=u,this.shouldIDraw=l},X=function(e,t,r,a){var n=r.moveTask;this.shouldIDraw=n.shouldIDraw,this.mod=n.mod,this.moveIndex=t,this.moveCoords=e,this.sharedData=n.sharedData,this.sharedData.origTable=r.table,this.sharedData.gameNum=r._id,this.sharedData.desiredDepth=n.sharedData.desiredDepth,this.sharedData.splitMoveID=a,this.timer={},this.history=[]},Y=function(e){var t=this;this.shouldIDraw=e.moveTask.shouldIDraw,this.started=new Date,this.splitMoveIndex=void 0,this.splitMoveID=Math.random()*Math.random();var r=[];e.moveTask.moveCoords.forEach((function(a,n){r.push(new X(a,n,e,t.splitMoveID))})),this.movesToSend=r,this.moves=r.slice(),this.thinkers=[],this.gameNum=e._id,this.origTable=e.table,this.origMoveTask=e.moveTask,this.pendingMoveCount=e.moveTask.moveCoords.length},Z=function(e){this.shouldIDraw=e.sharedData.shouldIDraw,this.mod=e.mod,this.gameNum=e.sharedData.gameNum,this.progress=e.progress,this.resolverArray=[],this.initialWNext=e.sharedData.origWNext,this.moveStr=[e.moveCoords[0],e.moveCoords[1],e.moveCoords[2],e.moveCoords[3]],this.initialTreeMoves=[this.moveStr],this.startingTable=e.sharedData.origTable,this.startingAllPastTables=e.sharedData.allPast,this.thisTaskTable=T(this.moveStr,this.startingTable),this.firstDepthValue=this.startingTable[e.moveCoords[2]][e.moveCoords[3]][1],this.desiredDepth=e.sharedData.desiredDepth,this.actualDepth=1,this.tableTree=[],this.moveStrTree=[],this.tableTree[0]=[this.startingTable],this.tableTree[1]=[this.thisTaskTable],this.tableTree[2]=[],this.moveStrTree[0]=[[]],this.moveStrTree[1]=[[this.moveStr]],this.moveStrTree[2]=[[]],this.smallDeepeningTaskCounts=[0,1];var t=new R(this.thisTaskTable,!this.initialWNext,this.actualDepth,this.initialTreeMoves,this.desiredDepth,this.firstDepthValue,e.cfColor,!1,this.gameNum,this.mod,this.shouldIDraw);this.smallDeepeningTasks=[t],this.solvedSmallDeepeningTasks=[]},$=function(e,t,r){this.value=e,this.moveTree=t,this.wPlayer=r},ee=function(e,t,r){this.trItm=!0,this.depth=e,this.moveTree=t,this.wPlayer=r},te=function(){this.moveCount=0,this.pendingMoveCount=0,this.desiredDepth=0,this.returnedMoves=[],this.gameIsOn=!0,this.whiteWon=!1,this.blackWon=!1,this.isDraw=!1,this.askWhiteDraw=!1,this.askBlackDraw=!1,this.whiteCanForceDraw=!1,this.blackCanForceDraw=!1,this.wNext=!0,this.moves=[],this.allPastTables=[],this.created=Date.now(),this.moved=null,this.table=function(){for(var e=[],t=0;t<8;t+=1)e[t]=[];for(var r=2;r<6;r+=1)for(var n=0;n<8;n+=1)e[n][r]=[0,0,0,!1,!1];for(var o=0;o<8;o++)e[o][1]=[2,1,0,!1,!1];for(var i=0;i<8;i++)e[i][6]=[1,1,0,!1,!1];return e[0][0]=[2,4,0,!0,!1],e[7][0]=[2,4,0,!0,!1],e[0][7]=[1,4,0,!0,!1],e[7][7]=[1,4,0,!0,!1],e[1][0]=[2,3,0,!0,!1],e[6][0]=[2,3,0,!0,!1],e[1][7]=[1,3,0,!0,!1],e[6][7]=[1,3,0,!0,!1],e[2][0]=[2,2,0,!0,!1],e[5][0]=[2,2,0,!0,!1],e[2][7]=[1,2,0,!0,!1],e[5][7]=[1,2,0,!0,!1],e[3][0]=[2,5,0,!0,!1],e[4][0]=[2,9,0,!0,!1],e[3][7]=[1,5,0,!0,!1],e[4][7]=[1,9,0,!0,!1],a(e,!0)}()},re=0,ae=[],ne=J.options.__b,oe=J.options.__r,ie=J.options.diffed,se=J.options.__c,he=J.options.unmount;J.options.__b=function(e){L=null,ne&&ne(e)},J.options.__r=function(e){oe&&oe(e),K=0;var t=(L=e.__c).__H;t&&(t.__h.forEach(V),t.__h.forEach(F),t.__h=[])},J.options.diffed=function(e){ie&&ie(e);var t=e.__c;t&&t.__H&&t.__H.__h.length&&(1!==ae.push(t)&&G===J.options.requestAnimationFrame||((G=J.options.requestAnimationFrame)||function(e){var t,r=function(){clearTimeout(a),ue&&cancelAnimationFrame(t),setTimeout(e)},a=setTimeout(r,100);ue&&(t=requestAnimationFrame(r))})(U)),L=void 0},J.options.__c=function(e,t){t.some((function(e){try{e.__h.forEach(V),e.__h=e.__h.filter((function(e){return!e.__||F(e)}))}catch(r){t.some((function(e){e.__h&&(e.__h=[])})),t=[],J.options.__e(r,e.__v)}})),se&&se(e,t)},J.options.unmount=function(e){he&&he(e);var t=e.__c;if(t&&t.__H)try{t.__H.__.forEach(V)}catch(e){J.options.__e(e,t.__v)}};var ue="function"==typeof requestAnimationFrame,le=r("UQ27"),ce=r.n(le),fe=function(){for(var e,t,r,a=(t=L.context[(e=B).__c],(r=M(K++,9)).__c=e,t?(null==r.__&&(r.__=!0,t.sub(L)),t.props.value):e.__),n=a.gameState,o=a.setGameState,i=n.table,s=H(),h=s[0],u=s[1],l=Math.min(window.innerHeight,window.innerWidth)/9,c=[],f=0;f<8;f+=1){c[f]=[];for(var v=0;v<8;v+=1)c[f][v]=i[v][7-f],f+v&1&&(c[f][v][7]=!0)}var d=function(e,t,r){if(!h)return r[9]=!0,r[5].forEach((function(e){i[e[0]][e[1]][9]=!0})),void u({rowIndex:e,colIndex:t});var a=[h.colIndex,7-h.rowIndex,t,7-e];if(a[0]===a[2]&&a[1]===a[3])return u(null),void o(function(e){return q({},e,{table:e.table.map((function(e){return e.map((function(e){return q({},e,{9:null})}))}))})}(n));var s=b(a,n);o(s),u(null),setTimeout((function(){var e=S(s,3);o(q({},b(e.moveCoords,s)))}),0)};return Object(J.h)("div",null,Object(J.h)("table",{className:"main-table unselectable"},Object(J.h)("tbody",null,Object(J.h)("tr",{className:"heading row0",style:{width:l,height:1}},Object(J.h)("td",null),Object(J.h)("td",null,"A"),Object(J.h)("td",null,"B"),Object(J.h)("td",null,"C"),Object(J.h)("td",null,"D"),Object(J.h)("td",null,"E"),Object(J.h)("td",null,"F"),Object(J.h)("td",null,"G"),Object(J.h)("td",null,"H")),c.map((function(e,t){return Object(J.h)("tr",{key:t,style:{height:l}},Object(J.h)("td",null,8-t),e.map((function(e,r){return Object(J.h)("td",{key:r,className:e[7]?ce.a.darker:ce.a.square},Object(J.h)("div",{style:{height:l},onClick:function(){return d(t,r,e)}},Object(J.h)("img",{src:"/assets/pieces/"+e[0]+e[1]+".png",height:l,width:l,class:""+(e[8]||e[9]?ce.a.selected:"")+(e[15]?ce.a.selected2:"")})))})))})))))},ve=function(){var e=H(new te),t={gameState:e[0],setGameState:e[1]};return Object(J.h)(B.Provider,{value:t},Object(J.h)(fe,null))};t.default=function(){return Object(J.h)(ve,null)}}}]);
//# sourceMappingURL=route-game.chunk.af144.js.map