<template>
  <button type="submit" :disabled="disabled">
    Sign in
  </button>
</template>

<script>
export default {
  name: 'SignInButton',
  props: {
    disabled: Boolean
  }
}
</script>

<style scoped>
button {
  background: rgb(131,58,180);
  background: linear-gradient(138deg, rgba(39,88,115,1) 0%, rgba(42,153,141,1) 14%, rgba(2,163,163,1) 27%, rgba(26,162,196,1) 35%, rgba(59,146,218,1) 45%, rgba(112,123,227,1) 54%, rgba(87,112,214,1) 61%, rgba(66,93,203,1) 68%, rgba(111,52,217,1) 76%, rgba(157,84,212,1) 98%);
  border-radius: 4px;
  box-shadow: 0 1px 0 rgba(255, 255, 255, 0.2) inset, 0 1px 2px rgba(0, 0, 0, 0.05);
  color: white;
  text-decoration: none;
  display: block;
  font-size: 1.2rem;
  font-weight: normal;
  width: 120px;
  margin: 20px auto;
  padding: 4px 12px;
  text-align: center;
  text-shadow: 0 1px 1px rgba(255, 255, 255, 0.75);
  position: relative;
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: -webkit-transform;
  transition-property: transform;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  -webkit-transform: translateZ(0);
  -ms-transform: translateZ(0);
  transform: translateZ(0);
  box-shadow: 0 0 1px rgba(0, 0, 0, 0);
}

button::before {
  pointer-events: none;
  position: absolute;
  z-index: -1;
  content: '';
  top: 100%;
  left: 5%;
  height: 10px;
  width: 90%;
  opacity: 0;
  background: -webkit-radial-gradient(center, ellipse, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
  background: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.35) 0%, rgba(0, 0, 0, 0) 80%);
  -webkit-transition-duration: 0.3s;
  transition-duration: 0.3s;
  -webkit-transition-property: -webkit-transform, opacity;
  transition-property: transform, opacity;
}

button:not([disabled]):hover {
  -webkit-transform: translateY(-5px);
  -ms-transform: translateY(-5px);
  transform: translateY(-5px) scale(1.1);
}

button:not([disabled]):hover::before {
  opacity: 1;
  -webkit-transform: translateY(5px);
  -ms-transform: translateY(5px);
  transform: translateY(5px);
}

button:not([disabled]):active {
  transition: .2s;
  filter: brightness(50%);
}

button[disabled] {
  cursor: not-allowed;
  opacity: .5;
}
</style>
