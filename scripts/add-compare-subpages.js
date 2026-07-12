/**
 * 添加缺失的 compare 子页面
 * 结构复制自 en.json，UI 标签翻译为各语言
 */

const fs = require('fs');
const path = require('path');

const MESSAGES_DIR = path.join(__dirname, '..', 'messages');

// 移除 BOM
function readJsonFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
  }
  return JSON.parse(content);
}

// 读取 en.json 的 compare 子页面
const enJson = readJsonFile(path.join(MESSAGES_DIR, 'en.json'));
const enCompare = enJson.compare;

// 需要添加的子页面
const subPages = ['harnessVsCollar', 'petInsuranceVsEmergencyFund', 'grainFreeVsWholeGrain', 'scratchingPostVsCatTree'];

// 每个子页面中需要翻译的 UI 标签位置（数组内的键名）
// 注意：这些页面的主要内容（如 pros/cons/body）保持英文作为回退
// 只翻译 UI 结构标签，避免大规模内容翻译

const targetLocales = ['fr', 'de', 'ja', 'ko', 'es', 'pt', 'nl', 'ar', 'ru', 'hi'];

// 页面特定的 UI 标签翻译（如 verdict, question, answer 等）
const pageUiLabels = {
  fr: { verdict: "Le verdict", question: "Question", answer: "Réponse" },
  de: { verdict: "Das Urteil", question: "Frage", answer: "Antwort" },
  ja: { verdict: "結論", question: "質問", answer: "回答" },
  ko: { verdict: "결론", question: "질문", answer: "답변" },
  es: { verdict: "El veredicto", question: "Pregunta", answer: "Respuesta" },
  pt: { verdict: "O veredito", question: "Pergunta", answer: "Resposta" },
  nl: { verdict: "Het vonnis", question: "Vraag", answer: "Antwoord" },
  ar: { verdict: "الحكم", question: "السؤال", answer: "الإجابة" },
  ru: { verdict: "Вердикт", question: "Вопрос", answer: "Ответ" },
  hi: { verdict: "फैसला", question: "प्रश्न", answer: "उत्तर" }
};

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

function processLocale(locale) {
  const filePath = path.join(MESSAGES_DIR, `${locale}.json`);
  const json = readJsonFile(filePath);

  if (!json.compare) {
    json.compare = {};
  }

  // 添加每个缺失的子页面
  subPages.forEach(pageKey => {
    if (!json.compare[pageKey] && enCompare[pageKey]) {
      // 克隆英文内容
      json.compare[pageKey] = deepClone(enCompare[pageKey]);
    }
  });

  // 写入文件
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf-8');
  console.log(`✓ [${locale}] 已添加 compare 子页面`);
}

// 执行
console.log('开始添加 compare 子页面...\n');
targetLocales.forEach(processLocale);
console.log('\n完成！');
