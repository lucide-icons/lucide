import { ref } from 'vue';

export default function useConfetti() {
  const animate = ref(false);
  const confettiText = ref('confetti!');

  function confetti() {
    animate.value = true;

    setTimeout(function () {
      animate.value = false;
    }, 1000);
  }

  return {
    animate,
    confetti,
    confettiText,
  };
}
