// This source code is subject to the terms of the Mozilla Public License 2.0 at https://mozilla.org/MPL/2.0/
// © piriya33
// Added Labels and alert conditions and other quality of life feature
// Updated compatability with pine script v4
// Based on improvements from "Kitti-Playbook Action Zone V.4.2.0.3 for Stock Market"

//@version=4
strategy('CDC ActionZone V3 3commas', (overlay = true), (precision = 6));
//****************************************************************************//
// CDC Action Zone is based on a simple EMA crossover
// between [default] EMA12 and EMA26
// The zones are defined by the relative position of
// price in relation to the two EMA lines
// Different zones can be use to activate / deactivate
// other trading strategies
// The strategy can also be used on its own with
// acceptable result, buy on the first green candle
// and sell on the first red candle
//****************************************************************************//
//****************************************************************************//
// Define User Input Variables

xsrc = input((title = 'Source Data'), (type = input.source), (defval = close));
xprd1 = input(
  (title = 'Fast EMA period'),
  (type = input.integer),
  (defval = 12)
);
xprd2 = input(
  (title = 'Slow EMA period'),
  (type = input.integer),
  (defval = 26)
);
xsmooth = input(
  (title = 'Smoothing period (1 = no smoothing)'),
  (type = input.integer),
  (defval = 1)
);
fillSW = input(
  (title = 'Paint Bar Colors'),
  (type = input.bool),
  (defval = true)
);
fastSW = input(
  (title = 'Show fast moving average line'),
  (type = input.bool),
  (defval = true)
);
slowSW = input(
  (title = 'Show slow moving average line'),
  (type = input.bool),
  (defval = true)
);
labelSwitch = input(
  (title = 'Turn on assistive text'),
  (type = input.bool),
  (defval = true)
);
plotSigsw = input(
  (title = 'Plot Buy/Sell Signals? '),
  (type = input.bool),
  (defval = true)
);
plotRibsw = input(
  (title = 'Plot Buy/Sell Ribbon'),
  (type = input.bool),
  (defval = false)
);
plotRibbonPos = input(
  (title = 'Ribbon Position'),
  (options = ['Top', 'Bottom']),
  (defval = 'Top')
);

xfixtf = input(
  (title = '** Use Fixed time frame Mode (advanced) **'),
  (type = input.bool),
  (defval = false)
);
xtf = input(
  (title = '** Fix chart to which time frame ? **)'),
  (type = input.resolution),
  (defval = 'D')
);

plotSig2sw = input(
  (title = 'Plot momentum based Buy/Sell Signals? '),
  (type = input.bool),
  (defval = false)
);
plotSig2lv = input(
  (title = 'Set signal threshold (higher = stricter)'),
  (type = input.integer),
  (defval = 1),
  (minval = 0),
  (maxval = 1)
);