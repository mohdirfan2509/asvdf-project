import { Construction, Disc3, Droplet, Grid3x3, Layers, Paintbrush, Ruler, Scissors, ShieldCheck, Sun, Wrench } from 'lucide-react';

const RULES = [
  [/vdf|vacuum/, Layers],
  [/pqc|pavement/, Construction],
  [/bar bending|rebar|reinforcement/, Grid3x3],
  [/screed/, Ruler],
  [/laser|level/, Sun],
  [/densif/, ShieldCheck],
  [/epoxy|coating/, Droplet],
  [/hardener|application/, Paintbrush],
  [/groove|joint|cutting/, Scissors],
  [/repair|restor/, Wrench],
  [/grind|polish/, Disc3],
];

/** Picks an outline icon from the service title; falls back to Layers. */
export function serviceIcon(title = '') {
  const value = String(title).toLowerCase();
  return RULES.find(([pattern]) => pattern.test(value))?.[1] || Layers;
}
