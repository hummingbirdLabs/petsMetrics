# 项目翻译术语表 (i18n Glossary)

> 此术语表确保全站翻译的一致性。所有新增翻译必须遵循此表。

---

## 1. 品牌与产品术语

| English | 中文 | Français | Deutsch | 日本語 | 上下文 |
|---------|------|---------|---------|--------|--------|
| petsMetrics | petsMetrics | petsMetrics | petsMetrics | petsMetrics | 品牌名不翻译 |
| Pet Profile | 档案 | Profil d'animal | Haustierprofil | ペットプロフィール | 宠物档案系统 |
| Calculator | 计算器 | Calculateur | Rechner | 计算机 | 工具类型 |
| Tool | 工具 | Outil | Werkzeug | ツール | 通用工具名 |

## 2. 物种与品类

| English | 中文 | 备注 |
|---------|------|------|
| Dog / Dogs | 狗 / 狗狗 | |
| Cat / Cats | 猫 / 猫咪 | |
| Puppy | 幼犬 | |
| Kitten | 幼猫 | |
| Breed | 品种 | |
| Species | 物种 | |

## 3. 健康与兽医术语

| English | 中文 | 权威来源 |
|---------|------|---------|
| Vaccination / Vaccine | 疫苗 | WSAVA / AAHA |
| Deworming | 驱虫 | |
| Body Condition Score (BCS) | 体况评分 | WSAVA |
| Resting Energy Requirement (RER) | 静息能量需求 | AAFCO |
| Maintenance Energy Requirement (MER) | 维持能量需求 | AAFCO |
| Gestation | 怀孕期 | |
| Whelping | 分娩（犬） | |
| Queening | 分娩（猫） | |
| Hepatic Lipidosis | 肝脂肪沉积症 | AAHA |
| Neutered / Spayed | 绝育 | AAHA |

## 4. 毒性相关术语

| English | 中文 | Severity |
|---------|------|----------|
| Toxic | 有毒 | 🔴 |
| Caution | 注意 | 🟡 |
| Safe | 安全 | 🟢 |
| Poison Control | 毒物控制 | |
| ASPCA Animal Poison Control | ASPCA 动物毒物控制中心 | |
| Pet Poison Helpline | 宠物毒物求助热线 | |
| Emergency | 紧急情况 | |
| Symptoms | 症状 | |
| Ingestion | 误食 | |

## 5. 权威机构缩写

| 缩写 | 全称 (English) | 中文翻译 |
|------|---------------|---------|
| AAHA | American Animal Hospital Association | 美国动物医院协会 |
| WSAVA | World Small Animal Veterinary Association | 世界小动物兽医协会 |
| AAFCO | Association of American Feed Control Officials | 美国饲料管理官员协会 |
| AAFP | American Association of Feline Practitioners | 美国猫科医师协会 |
| AVMA | American Veterinary Medical Association | 美国兽医医学协会 |
| ISFM | International Society of Feline Medicine | 国际猫医学学会 |
| NRC | National Research Council | 国家研究委员会 |
| FEDIAF | European Pet Food Industry Federation | 欧洲宠物食品工业协会 |
| NAPHIA | North American Pet Health Insurance Association | 北美宠物健康保险协会 |
| UCSD | University of California, San Diego | 加州大学圣地亚哥分校 |
| AKC | American Kennel Club | 美国养犬俱乐部 |
| ASPCA | American Society for the Prevention of Cruelty to Animals | 美国防止虐待动物协会 |
| USDA | United States Department of Agriculture | 美国农业部 |
| DEFRA | Department for Environment, Food and Rural Affairs | 英国环境、食品和农村事务部 |

## 6. UI 交互术语

| English | 中文 |
|---------|------|
| Calculate | 计算 |
| Submit | 提交 |
| Reset | 重置 |
| Download | 下载 |
| Share | 分享 |
| Copy Link | 复制链接 |
| Search | 搜索 |
| Results | 结果 |
| Form | 表单 |
| Error | 错误 |
| Loading | 加载中 |
| No results | 无结果 |
| Coming Soon | 即将推出 |
| Sponsored | 赞助 |
| Privacy Policy | 隐私政策 |
| Terms of Service | 服务条款 |

## 7. 数字与单位

| English | 中文 | 备注 |
|---------|------|------|
| kg / kilogram | 公斤 / 千克 | |
| lb / pound | 磅 | |
| g / gram | 克 | |
| ml / milliliter | 毫升 | |
| oz / ounce | 盎司 | |
| kcal | 千卡 / 大卡 | |
| years old | 岁 | |
| months | 个月 / 月 | |
| weeks | 周 | |
| days | 天 | |

## 8. 翻译规范

### 8.1 格式约定
- **变量占位符**: `{name}`, `{age}`, `{weight}` 保持不变
- **HTML 标签**: `<strong>`, `<a>`, `<br>` 保持不变
- **数字格式**: 根据目标语言惯例（如德语使用逗号作为小数分隔符）

### 8.2 复数规则
不同语言的复数形式数量不同：
- **英语**: 2 种形式 (one, other)
- **中文**: 1 种形式（无复数变化）
- **法语**: 2 种形式 (one, other，0 使用 one)
- **德语**: 2 种形式 (one, other)
- **日语**: 1 种形式
- **韩语**: 1 种形式
- **阿拉伯语**: 6 种形式 (zero, one, two, few, many, other)
- **俄语**: 3 种形式 (one, few, many)
- **波兰语**: 3 种形式 (one, few, many)

### 8.3 方向性 (RTL)
- **LTR 语言**: en, zh, fr, de, ja, ko, es, pt, ru, hi, nl
- **RTL 语言**: ar (阿拉伯语) - 需要 CSS Logical Properties 适配

### 8.4 长度控制
- **CJK 语言** (中日韩): 通常比英语短 30-50%
- **德语**: 通常比英语长 20-30%
- **按钮文本**: 控制在一行以内（≤ 4 个 CJK 字 / ≤ 20 个英文字符）
