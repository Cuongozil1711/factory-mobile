import {Easing} from 'react-native';

const AnimationSpec = {
  animation: 'timing',
  config: {
    duration: 300,
    easing: Easing.linear,
  },
};
const scaleBeforeSlideNext = {
  gestureDirection: 'horizontal',
  headerStyleInterpolator: ({}) => ({}),
  cardStyleInterpolator: ({current, layouts, next}) => ({
    cardStyle: {
      transform: [
        {
          translateX: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [layouts.screen.width, 0],
          }),
        },
        {
          scale: next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.95],
              })
            : 1,
        },
      ],
    },
    overlayStyle: {
      backgroundColor: 'black',
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.5],
      }),
    },
  }),
  transitionSpec: {
    open: AnimationSpec,
    close: AnimationSpec,
  },
};
const rotateFromRight = {
  gestureDirection: 'horizontal',
  headerStyleInterpolator: ({}) => ({}),
  cardStyleInterpolator: ({current, next, layouts}) => ({
    cardStyle: {
      transform: [
        {
          translateX: next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -layouts.screen.width * 1.5],
              })
            : current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width * 1.5, 0],
              }),
        },
        {
          rotate: next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '-40deg'],
              })
            : current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['40deg', '0deg'],
              }),
        },
      ],
    },
  }),
  transitionSpec: {
    open: {animation: 'timing', config: {}},
    close: {animation: 'timing', config: {}},
  },
};
const flipBook = {
  gestureDirection: 'horizontal',
  headerStyleInterpolator: ({}) => ({}),
  cardStyleInterpolator: ({current, layouts}) => ({
    cardStyle: {
      transform: [
        {perspective: 2500},
        {
          translateX: layouts.screen.width / 2,
        },
        {
          rotateY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: ['-270deg', '-360deg'],
          }),
        },
        {
          translateX: -layouts.screen.width / 2,
        },
      ],
    },
    overlayStyle: {
      backgroundColor: 'black',
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.8],
      }),
    },
  }),
  transitionSpec: {
    open: AnimationSpec,
    close: AnimationSpec,
  },
};

const scaleY = {
  gestureDirection: 'vertical',
  headerStyleInterpolator: ({}) => ({}),
  cardStyleInterpolator: ({current}) => ({
    cardStyle: {
      transform: [
        {perspective: 2500},
        {
          scaleY: current.progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
          }),
        },
      ],
    },
    overlayStyle: {
      backgroundColor: 'black',
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 0.8],
      }),
    },
  }),
  transitionSpec: {
    open: AnimationSpec,
    close: AnimationSpec,
  },
};
const flipY = {
  gestureDirection: 'horizontal',
  headerStyleInterpolator: ({}) => ({}),
  cardStyleInterpolator: ({current, next}) => ({
    cardStyle: {
      opacity: next
        ? next.progress.interpolate({
            inputRange: [0, 0.4, 0.5, 0.6, 1],
            outputRange: [1, 1, 1, 0, 0],
          })
        : current.progress.interpolate({
            inputRange: [0, 0.4, 0.5, 0.6, 1],
            outputRange: [0, 0, 0, 0, 1],
          }),
      transform: [
        {perspective: 2500},
        {
          rotateY: next
            ? next.progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '180deg'],
              })
            : current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: ['180deg', '0deg'],
              }),
        },
        {
          scale: next
            ? next.progress.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.7, 0.7, 1],
              })
            : current.progress.interpolate({
                inputRange: [0, 0.5, 1],
                outputRange: [0.7, 0.7, 1],
              }),
        },
      ],
    },
    overlayStyle: {
      backgroundColor: 'black',
      opacity: current.progress.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
    },
  }),
  transitionSpec: {
    open: {
      animation: 'timing',
      config: {
        duration: 500,
        easing: Easing.linear,
      },
    },
    close: {
      animation: 'timing',
      config: {
        duration: 500,
        easing: Easing.linear,
      },
    },
  },
};
export const TransitionPresets = {
  scaleBeforeSlideNext,
  rotateFromRight,
  flipBook,
  scaleY,
  flipY,
};
