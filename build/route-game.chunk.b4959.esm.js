(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{UQ27:function(e){e.exports={darker:"darker__3FUDV",square:"square__2d7yg",selected2:"selected2__215Pa",fadeIt:"fadeIt__2Id_H",selected:"selected__1JKN2"}},fajk:function(){},s3F4:function(e,t,r){"use strict";function a(e,t,r,a){for(var o=t?2:1,n=0;n<8;n+=1)for(var s=0;s<8;s+=1)e[n][s][5]=e[n][s][0]===o?l(n,s,t,e,!1,!1,[0],r,a):[];return e}function o(e,t,r){var a=0,o=0,n=0,s=[0],i=[0],c=0,u=0;void 0===r&&(r=h(e,!t));var f=1;if(t&&(f=2),t&&e[4][0][3]){var v=!1;e[0][0][3]&&(a+=3,v=!0,0===e[3][0][0]&&(a+=1),0===e[2][0][0]&&(a+=3),0===e[1][0][0]&&(a+=1),2===e[2][1][0]&&(a+=1,1===e[2][1][1]&&(a+=4)),2===e[1][1][0]&&(a+=1,1===e[1][1][1]&&(a+=4)),2===e[0][1][0]&&(a+=1,1===e[0][1][1]&&(a+=4))),e[7][0][3]&&(v=!0,o+=3,0===e[6][0][0]&&(o+=1),0===e[5][0][0]&&(o+=3),2===e[7][1][0]&&(o+=1,1===e[7][1][1]&&(o+=4)),2===e[6][1][0]&&(o+=1,1===e[6][1][1]&&(o+=4)),2===e[5][1][0]&&(o+=1,1===e[5][1][1]&&(o+=4))),v&&(1===e[3][1][1]&&2===e[3][1][0]&&(a-=6),1===e[4][1][1]&&2===e[4][1][0]&&(o-=6),2===e[2][0][1]&&2===e[2][0][0]&&(a-=6),2===e[5][0][1]&&2===e[5][0][0]&&(o-=6))}!t&&e[4][7][3]&&(v=!1,e[0][7][3]&&(v=!0,a+=3,0===e[3][7][0]&&(a+=1),0===e[2][7][0]&&(a+=3),0===e[1][7][0]&&(a+=1),1===e[2][6][0]&&(a+=1,1===e[2][6][1]&&(a+=4)),1===e[1][6][0]&&(a+=1,1===e[1][6][1]&&(a+=4)),1===e[0][6][0]&&(a+=1,1===e[0][6][1]&&(a+=4))),e[7][7][3]&&(v=!0,o+=3,0===e[6][7][0]&&(o+=1),0===e[5][7][0]&&(o+=3),1===e[7][6][0]&&(o+=1,1===e[7][6][1]&&(o+=4)),1===e[6][6][0]&&(o+=1,1===e[6][6][1]&&(o+=4)),1===e[5][6][0]&&(o+=1,1===e[5][6][1]&&(o+=4))),v&&(1===e[3][6][1]&&1===e[3][6][0]&&(a-=4),1===e[4][6][1]&&1===e[4][6][0]&&(o-=4),2===e[2][7][1]&&1===e[2][7][0]&&(a-=4),2===e[5][7][1]&&1===e[5][7][0]&&(o-=4)));for(var d=0,m=0;m<8;m+=1)for(var _=0;_<8;_+=1)e[m][_][0]===f?(u+=(7-Math.abs(r[0]-m)+(7-Math.abs(r[1]-_)))*e[m][_][1],l(m,_,t,e,!0,!0,s),e[m][_][2]>d&&(d=e[m][_][2]),c+=t?_:7-_,n+=e[m][_][1]):0!==e[m][_][0]&&(l(m,_,!t,e,!0,!0,i).length-2,c-=t?(7-_)/10:_/10,n-=e[m][_][1]);return[n,s[0],i[0],a,o,0,c,d,u]}function n(e,t,r,a,o){var n=t?2:1,s=[];r&&(t=!t);for(var i=[0],h=0;h<8;h+=1)for(var c=0;c<8;c+=1)e[h][c][0]===n&&l(h,c,t,e,!o,!0,i).forEach((function(e){s[s.length]=[h,c,e[0],e[1]]}));return s}function s(e,t){var r=1;t&&(r=2);var a=0;return n(e,t,!0).forEach((function(t){e[t[2]][t[3]][0]===r&&(e[t[2]][t[3]][6]=!0,a+=9===e[t[0]][t[1]][1]?2*(9-e[t[2]][t[3]][1]):9-e[t[2]][t[3]][1])})),a}function i(e,t){return s(e,t)-s(e,!t)}function h(e,t){var r=1;t&&(r+=1);for(var a=0;a<8;a+=1)for(var o=0;o<8;o+=1)if(9===e[a][o][1]&&e[a][o][0]===r)return[a,o]}function l(e,t,r,a,o,n,s=[0],i,h){var l=a[e][t][1],u=[];switch(l){case 1:u=m(e,t,r,a,s);break;case 2:u=d(e,t,r,a,s);break;case 3:u=p(e,t,r,a,s);break;case 4:u=v(e,t,r,a,s);break;case 5:u=function(e,t,r,a,o=[0]){var n=[],s=e+1,i=t+1;for(;c(o,n,s,i,a,r,5);)s+=1,i+=1;s=e-1,i=t-1;for(;c(o,n,s,i,a,r,5);)s-=1,i-=1;s=e+1,i=t-1;for(;c(o,n,s,i,a,r,5);)s+=1,i-=1;s=e-1,i=t+1;for(;c(o,n,s,i,a,r,5);)s-=1,i+=1;s=e+1;for(;c(o,n,s,t,a,r,5);)s+=1;s=e-1;for(;c(o,n,s,t,a,r,5);)s-=1;s=t+1;for(;c(o,n,e,s,a,r,5);)s+=1;s=t-1;for(;c(o,n,e,s,a,r,5);)s-=1;return n}(e,t,r,a,s);break;case 9:u=_(e,t,r,a,s)}if(void 0!==h&&u.forEach((function(r){h[h.length]=k(e,t,r[0],r[1])})),!o){for(var f=u.length-1;f>=0;f-=1)D(T(k(e,t,u[f][0],u[f][1]),a,n),r)&&u.splice(f,1);if(9===l&&a[e][t][3]){if(D(a,r))for(var g=u.length-1;g>=0;g-=1)u[g][1]!==t||u[g][0]!==e-2&&u[g][0]!==e+2||u.splice(g,1);var w=!0,b=!0;for(f=u.length-1;f>=0;f-=1)u[f][1]===t&&u[f][0]===e-1&&(w=!1),u[f][1]===t&&u[f][0]===e+1&&(b=!1);for(f=u.length-1;f>=0;f-=1)u[f][1]===t&&(u[f][0]===e-2&&w||u[f][0]===e+2&&b)&&u.splice(f,1)}}return u}function c(e,t,r,a,o,n,s){if(3===y(r,a,o)[0])return!1;const i=o[r][a];if(i[0]===(n?2:1))return!1;if(t[t.length]=[r,a,i[1]],0===i[0])return!0;var h=i[1];return i[6]&&(h-=s),e[0]<h&&(e[0]=h),!1}function u(e,t,r,a,o){0===o[r][a][0]&&(t[t.length]=[r,a,0])}function f(e,t,r,a,o,n){const s=n?1:2;if(r>0&&o[r-1][a][0]===s&&(t[t.length]=[r-1,a,o[r-1][a][1]]),r<7&&o[r+1][a][0]===s&&(t[t.length]=[r+1,a,o[r+1][a][1]]),0===o[r][a][0])return t[t.length]=[r,a,0],!0}function v(e,t,r,a,o=[0]){for(var n=[],s=e+1;c(o,n,s,t,a,r,4);)s+=1;for(s=e-1;c(o,n,s,t,a,r,4);)s-=1;for(s=t+1;c(o,n,e,s,a,r,4);)s+=1;for(s=t-1;c(o,n,e,s,a,r,4);)s-=1;return n}function d(e,t,r,a,o=[0]){for(var n=[],s=e+1,i=t+1;c(o,n,s,i,a,r,2);)s+=1,i+=1;for(s=e-1,i=t-1;c(o,n,s,i,a,r,2);)s-=1,i-=1;for(s=e+1,i=t-1;c(o,n,s,i,a,r,2);)s+=1,i-=1;for(s=e-1,i=t+1;c(o,n,s,i,a,r,2);)s-=1,i+=1;return n}function m(e,t,r,a,o){var n=[];return r?(f(0,n,e,t+1,a,!0)&&1===t&&u(0,n,e,t+2,a),e>0&&a[e-1][t][3]&&c(o,n,e-1,t+1,a,!0,1),e<7&&a[e+1][t][3]&&c(o,n,e+1,t+1,a,!0,1),n):(f(0,n,e,t-1,a,!1)&&6===t&&u(0,n,e,t-2,a),e>0&&a[e-1][t][3]&&c(o,n,e-1,t-1,a,!1,1),e<7&&a[e+1][t][3]&&c(o,n,e+1,t-1,a,!1,1),n)}function _(e,t,r,a,o){var n=[];return c(o,n,e+1,t+1,a,r,9),c(o,n,e-1,t+1,a,r,9),c(o,n,e+1,t-1,a,r,9),c(o,n,e-1,t-1,a,r,9),c(o,n,e+1,t,a,r,9),c(o,n,e-1,t,a,r,9),c(o,n,e,t+1,a,r,9),c(o,n,e,t-1,a,r,9),a[e][t][3]&&(a[0][t][3]&&0===a[1][t][0]&&0===a[2][t][0]&&0===a[3][t][0]&&c(o,n,2,t,a,r,9),a[7][t][3]&&0===a[5][t][0]&&0===a[6][t][0]&&c(o,n,6,t,a,r,9)),n}function p(e,t,r,a,o){var n=[];return c(o,n,e+1,t+2,a,r,3),c(o,n,e+1,t-2,a,r,3),c(o,n,e-1,t+2,a,r,3),c(o,n,e-1,t-2,a,r,3),c(o,n,e+2,t+1,a,r,3),c(o,n,e+2,t-1,a,r,3),c(o,n,e-2,t+1,a,r,3),c(o,n,e-2,t-1,a,r,3),n}function g(e){for(var t=[],r=0;r<8;r+=1)for(var a=0;a<8;a+=1){var o=10*~~e[r][a][0]+~~e[r][a][1]+55;o<65&&(o=65),t[8*r+a]=String.fromCharCode(o)}return t.join("")}function w(e,t){const r=e[t[0]][t[1]];String(r[1]);var a=e[t[2]][t[3]][0].toString()+e[t[2]][t[3]][1];return 1===r[1]&&t[0]!==t[2]&&"00"===a&&(a=1===r[0]?"21":"11"),r[0].toString()+r[1]+function(e,t,r,a){return String.fromCharCode(97+e)+(t+1)+String.fromCharCode(97+r)+(a+1)}(t)+a}function b(e,t){var r=w(t.table,e);t.moves.push(r),t.table=T(e,t.table),t.wNext=!t.wNext,t.pollNum+=1,t.moveCount+=1,t.table=a(t.table,t.wNext);var o=g(t.table);return t.allPastTables.push(o),t}function D(e,t){var r=[],a=1;t&&(a+=1);for(var o=0;o<8;o+=1)for(var n=0;n<8;n+=1)if(9===e[o][n][1]&&e[o][n][0]===a){r=d(o,n,t,e,[0]);for(var s=0;s<r.length;s+=1)if(5===e[r[s][0]][r[s][1]][1]||2===e[r[s][0]][r[s][1]][1])return!0;r=v(o,n,t,e,[0]);for(s=0;s<r.length;s+=1)if(5===e[r[s][0]][r[s][1]][1]||4===e[r[s][0]][r[s][1]][1])return!0;r=p(o,n,t,e,[0]);for(s=0;s<r.length;s+=1)if(3===e[r[s][0]][r[s][1]][1])return!0;if(t?n<7:n>0){r=m(o,n,t,e,[0]);for(s=0;s<r.length;s+=1)if(1===e[r[s][0]][r[s][1]][1])return!0}r=_(o,n,t,e,[0]);for(s=0;s<r.length;s+=1)if(9===e[r[s][0]][r[s][1]][1])return!0}return!1}function T(e,t,r,a){if(void 0===a)a=[0];for(var o=[],n=0;n<8;n+=1){o[n]=new Array(8);for(var s=0;s<8;s+=1){o[n][s]=new Array(4);for(var i=0;i<4;i+=1)o[n][s][i]=t[n][s][i]}}if(9===o[e[0]][e[1]][1]&&o[e[0]][e[1]][3])switch(e[2]){case 2:switch(e[3]){case 0:o=T([0,0,3,0],o);break;case 7:o=T([0,7,3,7],o)}break;case 6:switch(e[3]){case 0:o=T([7,0,5,0],o);break;case 7:o=T([7,7,5,7],o)}}for(let e=0;e<8;e+=1)o[e][3][3]=!1,o[e][4][3]=!1;1===o[e[0]][e[1]][1]&&(1===e[1]&&3===e[3]||6===e[1]&&4===e[3])&&(o[e[0]][e[1]][3]=!0);return 1===o[e[0]][e[1]][1]&&0===o[e[2]][e[3]][0]&&e[0]!==e[2]&&(!0,o[e[2]][e[3]]=o[e[2]][e[1]],o[e[2]][e[1]]=[0,0,!1,!1,!1]),a[0]=o[e[2]][e[3]][1],1!==o[e[0]][e[1]][1]||7!==e[3]&&0!==e[3]||(o[e[0]][e[1]][1]=5,a[0]+=4),o[e[0]][e[1]][2]+=1,o[e[2]][e[3]]=o[e[0]][e[1]],o[e[0]][e[1]]=[0,0,0],1!==o[e[2]][e[3]][1]&&(o[e[2]][e[3]][3]=!1),o}function k(e,t,r,a){return[e,t,r,a]}function y(e,t,r){return e>=0&&t>=0&&e<=7&&t<=7?r[e][t]:[3]}function I(e,t,r,a,o,n,s,i,h,l){var c=function(e,t,r){return e>=0&&t>=0&&e<=7&&t<=7?r[e][t]:[0]}(r,a,n);return 0!==c[0]?(c[0]===o?(h[0]+=1,s[r][a]=!0):(l[8*r+a]=!0,i[i.length]=[e,t,r,a,n[e][t][1],n[r][a][1]]),!0):(l[8*r+a]=!0,!1)}function C(e,t,r,a,o,n,s,i,h,l){return!(r<0||r>7)&&(0!==n[r][a][0]?(n[r][a][0]===o?(h[0]+=1,s[r][a]=!0):(l[8*r+a]=!0,i[i.length]=[e,t,r,a,n[e][t][1],n[r][a][1]]),!0):(l[8*r+a]=!0,!1))}function N(e,t,r,a,o,n,s,i,h,l){var c=y(r,a,n);return 3!==c[0]&&(0===c[0]?(l[8*r+a]=!0,!0):(c[0]===o?(h[0]+=1,s[r][a]=!0):(l[8*r+a]=!0,i[i.length]=[e,t,r,a,n[e][t][1],n[r][a][1]]),!1))}function x(e,t){for(var r=new Array(8),a=0;a<8;a+=1){r[a]=new Array(8);for(var o=0;o<8;o+=1)r[a][o]=new Int8Array(2),r[a][o][0]=t[a][o][0],r[a][o][1]=t[a][o][1]}if(9===r[e[0]][e[1]][1]&&r[e[0]][e[1]][3])switch(e[2]){case 2:switch(e[3]){case 0:r=x([0,0,3,0],r);break;case 7:r=x([7,0,5,0],r)}break;case 7:switch(e[3]){case 0:r=x([0,7,3,7],r);break;case 7:r=x([7,7,5,7],r)}}return 1!==r[e[0]][e[1]][1]||7!==e[3]&&0!==e[3]||(r[e[0]][e[1]][1]=5),r[e[2]][e[3]]=r[e[0]][e[1]],r[e[0]][e[1]]=[0,0,0],r}function j(e,t,r,a,o,n,s,i){switch(a[e][t][1]){case 1:!function(e,t,r,a,o,n,s,i){if(2===o)return C(e,t,e+1,t+1,o,r,a,n,s,i),void C(e,t,e-1,t+1,o,r,a,n,s,i);C(e,t,e+1,t-1,o,r,a,n,s,i),C(e,t,e-1,t-1,o,r,a,n,s,i)}(e,t,a,o,r,n,s,i);break;case 2:!function(e,t,r,a,o,n,s,i){for(var h=e+1,l=t+1;N(e,t,h,l,o,r,a,n,s,i);)h+=1,l+=1;for(h=e-1,l=t-1;N(e,t,h,l,o,r,a,n,s,i);)h-=1,l-=1;for(h=e-1,l=t+1;N(e,t,h,l,o,r,a,n,s,i);)h-=1,l+=1;for(h=e+1,l=t-1;N(e,t,h,l,o,r,a,n,s,i);)h+=1,l-=1}(e,t,a,o,r,n,s,i);break;case 3:!function(e,t,r,a,o,n,s,i){I(e,t,e+1,t+2,o,r,a,n,s,i),I(e,t,e+1,t-2,o,r,a,n,s,i),I(e,t,e-1,t+2,o,r,a,n,s,i),I(e,t,e-1,t-2,o,r,a,n,s,i),I(e,t,e+2,t+1,o,r,a,n,s,i),I(e,t,e+2,t-1,o,r,a,n,s,i),I(e,t,e-2,t+1,o,r,a,n,s,i),I(e,t,e-2,t-1,o,r,a,n,s,i)}(e,t,a,o,r,n,s,i);break;case 4:!function(e,t,r,a,o,n,s,i){for(var h=e+1;N(e,t,h,t,o,r,a,n,s,i);)h+=1;for(h=e-1;N(e,t,h,t,o,r,a,n,s,i);)h-=1;for(h=t+1;N(e,t,e,h,o,r,a,n,s,i);)h+=1;for(h=t-1;N(e,t,e,h,o,r,a,n,s,i);)h-=1}(e,t,a,o,r,n,s,i);break;case 5:!function(e,t,r,a,o,n,s,i){for(var h=e+1;N(e,t,h,t,o,r,a,n,s,i);)h+=1;for(h=e-1;N(e,t,h,t,o,r,a,n,s,i);)h-=1;for(h=t+1;N(e,t,e,h,o,r,a,n,s,i);)h+=1;for(h=t-1;N(e,t,e,h,o,r,a,n,s,i);)h-=1;h=e+1;for(var l=t+1;N(e,t,h,l,o,r,a,n,s,i);)h+=1,l+=1;for(h=e-1,l=t-1;N(e,t,h,l,o,r,a,n,s,i);)h-=1,l-=1;for(h=e-1,l=t+1;N(e,t,h,l,o,r,a,n,s,i);)h-=1,l+=1;for(h=e+1,l=t-1;N(e,t,h,l,o,r,a,n,s,i);)h+=1,l-=1}(e,t,a,o,r,n,s,i);break;case 9:!function(e,t,r,a,o,n,s,i){I(e,t,e+1,t,o,r,a,n,s,i),I(e,t,e-1,t,o,r,a,n,s,i),I(e,t,e+1,t+1,o,r,a,n,s,i),I(e,t,e-1,t+1,o,r,a,n,s,i),I(e,t,e+1,t-1,o,r,a,n,s,i),I(e,t,e-1,t-1,o,r,a,n,s,i),I(e,t,e,t+1,o,r,a,n,s,i),I(e,t,e,t-1,o,r,a,n,s,i),r[e][t][3]&&(r[0][t][3]&&0===r[1][t][0]&&0===r[2][t][0]&&0===r[3][t][0]&&I(e,t,2,t,o,r,a,n,s,i),r[7][t][3]&&0===r[5][t][0]&&0===r[6][t][0]&&I(e,t,6,t,o,r,a,n,s,i))}(e,t,a,o,r,n,s,i)}}function O(e,t,r,a,o){var n=1,s=1,i=1;switch(o&&o.modType){case"fwV":n=o.modConst;break;case"bHK":s=o.modConst;break;case"hKM":i=o.modConst}var h,l,c=0,u=[],f=[],v=new Uint8Array(1),d=new Uint8Array(1),m=0,_=0,p=0,g=0,w=[new Uint8Array(8),new Uint8Array(8),new Uint8Array(8),new Uint8Array(8),new Uint8Array(8),new Uint8Array(8),new Uint8Array(8),new Uint8Array(8)];t?(l=1,h=2):(h=1,l=2);for(var b={},D={},T=0;T<8;T+=1)for(var k=0;k<8;k+=1)e[T][k][0]===h?(1===e[T][k][1]&&(c+=1===h?7-k:k),j(T,k,h,e,w,u,v,b)):0!==e[T][k][0]&&(1===e[T][k][1]&&(c-=1===l?7-k:k),j(T,k,l,e,w,f,d,9===e[T][k][1]?D:{}));u.forEach((function(e){var t=0;(t=w[e[2]][e[3]]?e[5]-e[4]:e[5])>p&&(p=t,e),m+=t})),f.forEach((function(e){var t=0;(t=w[e[2]][e[3]]?e[5]-e[4]:e[5])>g&&(g=t),_+=t}));var y=v[0]-d[0],I=m-_,C=Object.keys(D),N=8-C.length,x=C.reduce((e,t)=>b[t]?e+1:e,0);c*=1*n,N*=1*i,x*=1*s;var O=new Int32Array(1);return O[0]=65536*p-4096*g,r?O[0]-=(y<<8)+(I<<4)+c+(N<<9)+(x<<10):O[0]+=(y<<8)+(I<<4)+c+(N<<9)+(x<<10),O}function A(e,t){var r=[],o=!e.wNext;if(2===e.depth&&D(e.table,o)&&(r=[new J(e.table,o,e.depth+1,e.moveTree,e.desiredDepth,100,e.wPlayer,!1,e.gameNum,e.mod,e.shouldIDraw)]),e.trItm)E(e.depth,t);else if(e.depth>e.desiredDepth)t[e.depth][t[e.depth].length]=new R(e.score,e.moveTree,e.wPlayer);else{var n=1&e.depth;if(e.depth===e.desiredDepth){var s;s=n?(e.score<<16)-O(e.table,e.wNext,!1,0,e.mod)[0]:(e.score<<16)+O(e.table,e.wNext,!0,0,e.mod)[0],r[r.length]=new J([],o,e.depth+1,e.moveTree,e.desiredDepth,s,e.wPlayer,!1,e.gameNum,e.mod,e.shouldIDraw)}else{var i=[];a(e.table,e.wNext,!0,i);for(var h=i.length-1;h>=0;h-=1){var l,c=i[h];l=x(c,e.table);var u,f=e.table[c[2]][c[3]][1],v=e.moveTree.concat([c,u=n?e.score-f:e.score+f]);r[r.length]=new J(l,o,e.depth+1,v,e.desiredDepth,u,e.wPlayer,!1,e.gameNum,e.mod,e.shouldIDraw)}}r[r.length]=new X(e.depth+1,e.moveTree,e.wPlayer)}return r}function P(e,t){var r=e.progress,a=(new Date).getTime();t&&(e={desiredDepth:e.desiredDepth,smallDeepeningTasks:[e],wPlayer:e.wPlayer,mod:e.mod,shouldIDraw:e.shouldIDraw});for(var o=[],n=e.desiredDepth+2,s=0;s<n;s+=1)o[s]=[];for(;e.smallDeepeningTasks.length>0;)for(var i=A(e.smallDeepeningTasks.pop(),o),h=i.length-1;h>=0;h-=1)e.smallDeepeningTasks[e.smallDeepeningTasks.length]=i[h];var l=(new Date).getTime()-a,c={gameNum:e.gameNum,progress:r,timeItTook:l,score:o[2][0].value,moveTree:o[2][0].moveTree};return!0!==t&&(c.score=o[1][0].value),c}function S(e,t,r,a){var o=function e(t){var r;if(null===t||"object"!=typeof t)return t;if(t instanceof Date)return(r=new Date).setTime(t.getTime()),r;if(t instanceof Array){r=[];for(var a=0,o=t.length;a<o;a+=1)r[a]=e(t[a]);return r}if(t instanceof Object){for(var n in r={},t)t.hasOwnProperty(n)&&(r[n]=e(t[n]));return r}throw new Error("Unable to copy obj! Its type isn't supported.")}(e);o.moveTask=new G(o,a),o.moveTask.sharedData.desiredDepth=t;var n=new Q(o).movesToSend;n.forEach((function(e){e.progress={moveCoords:e.moveCoords,moveIndex:e.moveIndex,done:!1,result:{},expected:void 0}}));var s=[];n.forEach((function(e){var t=new z(e);!function(e){for(var t=e.smallDeepeningTasks.pop(),r=A(t,t.resolverArray);r.length>0;){var a=r.pop();e.smallDeepeningTasks[e.smallDeepeningTasks.length]=a}e.smallDeepeningTasksCopy=e.smallDeepeningTasks.slice(),e.resolverArray=[]}(t);for(var r=[];t.smallDeepeningTasks.length>1;){var a=t.smallDeepeningTasks.pop();a.progress=t.progress;var n=P(a,!0);n.value=n.score,r[r.length]=n}var i=[];i[1]=[],i[2]=r,i[3]=[],E(2,i);var h,l=i[1][0],c=l.moveTree[0];if(!o.moveTask.shouldIDraw){var u=T(c,o.table);h=$.checkIfLooped(u,o.allPastTables)}h&&(l.value-=Math.pow(h,5)),l.score=l.value,l.move=c,s[s.length]=l})),s.sort((function(e,t){return e.score<t.score?1:e.score===t.score?0:-1}));var i={result:s,winningMove:s[0],moveCoords:s[0].moveTree[0]};return r&&r(i),i}function E(e,t){if(t[e].length>0){var r=t[e-1];r[r.length]=t[e].reduce(1&e?function(e,t){return t.value>e.value?{value:t.value,moveTree:t.moveTree}:{value:e.value,moveTree:e.moveTree}}:function(e,t){return t.value<e.value?{value:t.value,moveTree:t.moveTree}:{value:e.value,moveTree:e.moveTree}})}t[e]=[]}function M(e,t){K.options.__h&&K.options.__h(ee,e,re||t),re=0;var r=ee.__H||(ee.__H={__:[],__h:[]});return e>=r.__.length&&r.__.push({}),r.__[e]}function H(e){return re=1,function(e,t,r){var a=M(Z++,2);return a.t=e,a.__c||(a.__=[r?r(t):W(void 0,t),function(e){var t=a.t(a.__[0],e);a.__[0]!==t&&(a.__=[t,a.__[1]],a.__c.setState({}))}],a.__c=ee),a.__}(W,e)}function U(){ae.forEach((function(e){if(e.__P)try{e.__H.__h.forEach(V),e.__H.__h.forEach(F),e.__H.__h=[]}catch(t){e.__H.__h=[],K.options.__e(t,e.__v)}})),ae=[]}function V(e){var t=ee;"function"==typeof e.__c&&e.__c(),ee=t}function F(e){var t=ee;e.__c=e.__(),ee=t}function W(e,t){return"function"==typeof t?t(e):t}function q(){return(q=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e}).apply(this,arguments)}r.r(t);var K=r("hosL");r("ox/y"),r("fajk");var L=Object(K.createContext)("test"),$={getPieceValues:function(e){var t={wVal:0,bVal:0};return e.table.forEach((function(e){e.forEach((function(e){switch(e[0]){case 1:t.bVal+=e[1];break;case 2:t.wVal+=e[1]}}))})),t},shouldIDraw:function(e){var t=this.getPieceValues(e);if(e.wNext){if(t.wVal<t.bVal)return!0}else if(t.wVal>t.bVal)return!0;return!1},checkIfLooped:function(e,t){var r=0,a=g(e);return t.forEach((function(e){e===a&&(r+=1)})),r}},G=function(e,t){this.id=Math.random();var r=$.shouldIDraw(e);this.shouldIDraw=r,t&&(this.mod=t),this.sharedData={shouldIDraw:r,origWNext:e.wNext,desiredDepth:e.desiredDepth,oppKingPos:h(e.table,!e.wNext),origProtect:i(e.table,e.wNext),origData:o(e.table,e.wNext),origDeepDatatt:O(e.table,!0,!0,0,t),origDeepDatatf:O(e.table,!0,!1,0,t),origDeepDataft:O(e.table,!1,!0,0,t),origDeepDataff:O(e.table,!1,!1,0,t)},this.moveCoords=n(e.table,e.wNext,!1,0,!0);var a=!1;this.sharedData.origData[0]>1&&(a=!0),this.sharedData.dontLoop=a},J=function(e,t,r,a,o,n,s,i,h,l,c){this.gameNum=h,this.wPlayer=s,this.table=e,this.wNext=t,this.depth=r,this.moveTree=a,this.desiredDepth=o,this.score=n,this.mod=l,this.shouldIDraw=c},B=function(e,t,r,a){var o=r.moveTask;this.shouldIDraw=o.shouldIDraw,this.mod=o.mod,this.moveIndex=t,this.moveCoords=e,this.sharedData=o.sharedData,this.sharedData.origTable=r.table,this.sharedData.gameNum=r._id,this.sharedData.desiredDepth=o.sharedData.desiredDepth,this.sharedData.splitMoveID=a,this.timer={},this.history=[]},Q=function(e){this.shouldIDraw=e.moveTask.shouldIDraw,this.started=new Date,this.splitMoveIndex=void 0,this.splitMoveID=Math.random()*Math.random();var t=[];e.moveTask.moveCoords.forEach((r,a)=>{t.push(new B(r,a,e,this.splitMoveID))}),this.movesToSend=t,this.moves=t.slice(),this.thinkers=[],this.gameNum=e._id,this.origTable=e.table,this.origMoveTask=e.moveTask,this.pendingMoveCount=e.moveTask.moveCoords.length},z=function(e){this.shouldIDraw=e.sharedData.shouldIDraw,this.mod=e.mod,this.gameNum=e.sharedData.gameNum,this.progress=e.progress,this.resolverArray=[],this.initialWNext=e.sharedData.origWNext,this.moveStr=[e.moveCoords[0],e.moveCoords[1],e.moveCoords[2],e.moveCoords[3]],this.initialTreeMoves=[this.moveStr],this.startingTable=e.sharedData.origTable,this.startingAllPastTables=e.sharedData.allPast,this.thisTaskTable=T(this.moveStr,this.startingTable),this.firstDepthValue=this.startingTable[e.moveCoords[2]][e.moveCoords[3]][1],this.desiredDepth=e.sharedData.desiredDepth,this.actualDepth=1,this.tableTree=[],this.moveStrTree=[],this.tableTree[0]=[this.startingTable],this.tableTree[1]=[this.thisTaskTable],this.tableTree[2]=[],this.moveStrTree[0]=[[]],this.moveStrTree[1]=[[this.moveStr]],this.moveStrTree[2]=[[]],this.smallDeepeningTaskCounts=[0,1];var t=new J(this.thisTaskTable,!this.initialWNext,this.actualDepth,this.initialTreeMoves,this.desiredDepth,this.firstDepthValue,e.cfColor,!1,this.gameNum,this.mod,this.shouldIDraw);this.smallDeepeningTasks=[t],this.solvedSmallDeepeningTasks=[]},R=function(e,t,r){this.value=e,this.moveTree=t,this.wPlayer=r},X=function(e,t,r){this.trItm=!0,this.depth=e,this.moveTree=t,this.wPlayer=r};class Y{constructor(){this.moveCount=0,this.pendingMoveCount=0,this.desiredDepth=0,this.returnedMoves=[],this.gameIsOn=!0,this.whiteWon=!1,this.blackWon=!1,this.isDraw=!1,this.askWhiteDraw=!1,this.askBlackDraw=!1,this.whiteCanForceDraw=!1,this.blackCanForceDraw=!1,this.wNext=!0,this.moves=[],this.allPastTables=[],this.created=Date.now(),this.moved=null,this.table=(()=>{const e=[];for(let t=0;t<8;t+=1)e[t]=[];for(let t=2;t<6;t+=1)for(let r=0;r<8;r+=1)e[r][t]=[0,0,0,!1,!1];for(let t=0;t<8;t++)e[t][1]=[2,1,0,!1,!1];for(let t=0;t<8;t++)e[t][6]=[1,1,0,!1,!1];return e[0][0]=[2,4,0,!0,!1],e[7][0]=[2,4,0,!0,!1],e[0][7]=[1,4,0,!0,!1],e[7][7]=[1,4,0,!0,!1],e[1][0]=[2,3,0,!0,!1],e[6][0]=[2,3,0,!0,!1],e[1][7]=[1,3,0,!0,!1],e[6][7]=[1,3,0,!0,!1],e[2][0]=[2,2,0,!0,!1],e[5][0]=[2,2,0,!0,!1],e[2][7]=[1,2,0,!0,!1],e[5][7]=[1,2,0,!0,!1],e[3][0]=[2,5,0,!0,!1],e[4][0]=[2,9,0,!0,!1],e[3][7]=[1,5,0,!0,!1],e[4][7]=[1,9,0,!0,!1],a(e,!0)})()}}var Z,ee,te,re=0,ae=[],oe=K.options.__b,ne=K.options.__r,se=K.options.diffed,ie=K.options.__c,he=K.options.unmount;K.options.__b=function(e){ee=null,oe&&oe(e)},K.options.__r=function(e){ne&&ne(e),Z=0;var t=(ee=e.__c).__H;t&&(t.__h.forEach(V),t.__h.forEach(F),t.__h=[])},K.options.diffed=function(e){se&&se(e);var t=e.__c;t&&t.__H&&t.__H.__h.length&&(1!==ae.push(t)&&te===K.options.requestAnimationFrame||((te=K.options.requestAnimationFrame)||function(e){var t,r=function(){clearTimeout(a),le&&cancelAnimationFrame(t),setTimeout(e)},a=setTimeout(r,100);le&&(t=requestAnimationFrame(r))})(U)),ee=void 0},K.options.__c=function(e,t){t.some((function(e){try{e.__h.forEach(V),e.__h=e.__h.filter((function(e){return!e.__||F(e)}))}catch(r){t.some((function(e){e.__h&&(e.__h=[])})),t=[],K.options.__e(r,e.__v)}})),ie&&ie(e,t)},K.options.unmount=function(e){he&&he(e);var t=e.__c;if(t&&t.__H)try{t.__H.__.forEach(V)}catch(e){K.options.__e(e,t.__v)}};var le="function"==typeof requestAnimationFrame,ce=r("UQ27"),ue=r.n(ce);const fe=()=>{const{gameState:e,setGameState:t}=(a=ee.context[(r=L).__c],(o=M(Z++,9)).__c=r,a?(null==o.__&&(o.__=!0,a.sub(ee)),a.props.value):r.__);var r,a,o;const{table:n}=e,[s,i]=H(),h=Math.min(window.innerHeight,window.innerWidth)/9,l=[];for(let e=0;e<8;e+=1){l[e]=[];for(let t=0;t<8;t+=1)l[e][t]=n[t][7-e],e+t&1&&(l[e][t][7]=!0)}const c=(r,a,o)=>{if(!s)return o[9]=!0,o[5].forEach(([e,t])=>{n[e][t][9]=!0}),void i({rowIndex:r,colIndex:a});const h=[s.colIndex,7-s.rowIndex,a,7-r];if(h[0]===h[2]&&h[1]===h[3])return i(null),void t((e=>q({},e,{table:e.table.map(e=>e.map(e=>q({},e,{9:null})))}))(e));const l=b(h,e);t(l),i(null),setTimeout(()=>{const{moveCoords:e}=S(l,3);t(q({},b(e,l)))},0)};return Object(K.h)("div",null,Object(K.h)("table",{className:"main-table unselectable"},Object(K.h)("tbody",null,Object(K.h)("tr",{className:"heading row0",style:{width:h,height:1}},Object(K.h)("td",null),Object(K.h)("td",null,"A"),Object(K.h)("td",null,"B"),Object(K.h)("td",null,"C"),Object(K.h)("td",null,"D"),Object(K.h)("td",null,"E"),Object(K.h)("td",null,"F"),Object(K.h)("td",null,"G"),Object(K.h)("td",null,"H")),l.map((e,t)=>Object(K.h)("tr",{key:t,style:{height:h}},Object(K.h)("td",null,8-t),e.map((e,r)=>Object(K.h)("td",{key:r,className:e[7]?ue.a.darker:ue.a.square},Object(K.h)("div",{style:{height:h},onClick:()=>c(t,r,e)},Object(K.h)("img",{src:`/assets/pieces/${e[0]}${e[1]}.png`,height:h,width:h,class:`${e[8]||e[9]?ue.a.selected:""}${e[15]?ue.a.selected2:""}`})))))))))};var ve=()=>{const[e,t]=H(new Y),r={gameState:e,setGameState:t};return Object(K.h)(L.Provider,{value:r},Object(K.h)(fe,null))};t.default=()=>Object(K.h)(ve,null)}}]);
//# sourceMappingURL=route-game.chunk.b4959.esm.js.map