// Phase 8 — T8.1: BARF 生食配比数据
// 科学配比标准来源: NRC犬猫营养学, Dr. Karen Becker's Raw Feeding Guide
// 参考 README.MD §7.1

export type BARFRatioTable = {
  muscleMeat: number;
  rawMeatyBone: number;
  liver: number;
  secretingOrgan: number;
  vegetables: number | null; // 猫类为 null
};

export const BARF_RATIOS: Record<'dog' | 'cat', BARFRatioTable> = {
  dog: {
    muscleMeat: 0.70,
    rawMeatyBone: 0.10,
    liver: 0.05,
    secretingOrgan: 0.05,
    vegetables: 0.10,
  },
  cat: {
    muscleMeat: 0.75,
    rawMeatyBone: 0.10,
    liver: 0.05,
    secretingOrgan: 0.10,
    vegetables: null, // 猫类不需要植物性食物
  },
};

/** 成年犬猫每日喂食比例范围 */
export const FEEDING_PERCENTAGE_RANGE = {
  min: 0.02,
  max: 0.03,
  default: 0.025,
} as const;
