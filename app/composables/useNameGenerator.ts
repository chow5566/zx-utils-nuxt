/**
 * 人名生成器
 * 支持中文名、网名、英文名三种类型
 */

export type NameType = 'chinese' | 'nickname' | 'english'

export interface NameResult {
  /** 生成的名字 */
  name: string
  /** 名字类型 */
  type: NameType
  /** 类型标签（中文显示） */
  typeLabel: string
}

// ============ 中文名数据 ============

/** 常见中文姓氏（Top 100） */
const surnames = [
  '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯', '陈',
  '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦', '尤', '许',
  '何', '吕', '施', '张', '孔', '曹', '严', '华', '金', '魏',
  '陶', '姜', '戚', '谢', '邹', '喻', '柏', '水', '窦', '章',
  '云', '苏', '潘', '葛', '奚', '范', '彭', '郎', '鲁', '韦',
  '昌', '马', '苗', '凤', '花', '方', '俞', '任', '袁', '柳',
  '酆', '鲍', '史', '唐', '费', '廉', '岑', '薛', '雷', '贺',
  '倪', '汤', '滕', '殷', '罗', '毕', '郝', '邬', '安', '常',
  '乐', '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余',
  '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹',
]

/** 中文名常用字（偏男性） */
const maleNameChars = [
  '伟', '强', '磊', '军', '勇', '杰', '涛', '明', '超', '华',
  '林', '鹏', '飞', '刚', '平', '辉', '宇', '浩', '然', '博',
  '文', '毅', '俊', '峰', '宁', '建', '志', '国', '龙', '海',
  '鑫', '晨', '阳', '轩', '泽', '瑞', '逸', '翰', '哲', '铭',
]

/** 中文名常用字（偏女性） */
const femaleNameChars = [
  '芳', '敏', '静', '丽', '婷', '雪', '玲', '萍', '红', '霞',
  '燕', '娟', '秀', '琴', '英', '娜', '艳', '梅', '兰', '洁',
  '慧', '琳', '莉', '欣', '怡', '雨', '诗', '思', '婉', '瑶',
  '月', '蕾', '薇', '芸', '晴', '宁', '彤', '菲', '琪', '涵',
]

/** 中文名组合前缀（双名用） */
const namePrefix = [
  '思', '晓', '文', '志', '玉', '明', '小', '子', '若', '安',
  '一', '之', '永', '立', '正', '云', '天', '成', '学', '书',
]

// ============ 英文名数据 ============

/** 常见英文男名 */
const maleEnglishNames = [
  'James', 'John', 'Robert', 'Michael', 'William', 'David', 'Richard', 'Joseph',
  'Thomas', 'Charles', 'Christopher', 'Daniel', 'Matthew', 'Anthony', 'Mark',
  'Donald', 'Steven', 'Paul', 'Andrew', 'Joshua', 'Kenneth', 'Kevin', 'Brian',
  'George', 'Timothy', 'Ronald', 'Edward', 'Jason', 'Jeffrey', 'Ryan', 'Jacob',
  'Gary', 'Nicholas', 'Eric', 'Jonathan', 'Stephen', 'Larry', 'Justin', 'Scott',
  'Brandon', 'Benjamin', 'Samuel', 'Raymond', 'Gregory', 'Frank', 'Alexander',
  'Patrick', 'Jack', 'Dennis', 'Jerry', 'Tyler', 'Aaron', 'Henry', 'Peter',
]

/** 常见英文女名 */
const femaleEnglishNames = [
  'Mary', 'Patricia', 'Jennifer', 'Linda', 'Barbara', 'Elizabeth', 'Susan',
  'Jessica', 'Sarah', 'Karen', 'Lisa', 'Nancy', 'Betty', 'Margaret', 'Sandra',
  'Ashley', 'Dorothy', 'Kimberly', 'Emily', 'Donna', 'Michelle', 'Carol',
  'Amanda', 'Melissa', 'Deborah', 'Stephanie', 'Rebecca', 'Sharon', 'Laura',
  'Cynthia', 'Kathleen', 'Amy', 'Angela', 'Shirley', 'Anna', 'Brenda', 'Pamela',
  'Emma', 'Nicole', 'Helen', 'Samantha', 'Katherine', 'Christine', 'Debra',
  'Rachel', 'Carolyn', 'Janet', 'Catherine', 'Maria', 'Olivia', 'Grace',
]

/** 常见英文姓氏 */
const englishSurnames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson', 'Walker',
  'Young', 'Allen', 'King', 'Wright', 'Scott', 'Torres', 'Nguyen', 'Hill',
  'Flores', 'Green', 'Adams', 'Nelson', 'Baker', 'Hall', 'Rivera', 'Campbell',
  'Mitchell', 'Carter', 'Roberts', 'Phillips', 'Evans', 'Turner', 'Parker',
]

// ============ 网名数据 ============

/** 网名形容词前缀 */
const nicknameAdjectives = [
  '快乐', '忧伤', '阳光', '流浪', '沉默', '温柔', '孤独', '自由',
  '安静', '疯狂', '勇敢', '慵懒', '潇洒', '任性', '傲娇', '呆萌',
  '高冷', '暖心', '酷炫', '低调', '神秘', '文艺', '霸气', '软萌',
  '薄荷', '星辰', '烟火', '海风', '月光', '柠檬', '樱花', '梧桐',
  '草莓', '橘子', '初雪', '盛夏', '微凉', '浅笑', '逆光', '拾光',
]

/** 网名名词后缀 */
const nicknameNouns = [
  '少年', '女孩', '先生', '小姐', '大叔', '阿姨', '哥哥', '姐姐',
  '旅人', '过客', '行者', '浪子', '猫咪', '兔子', '小熊', '小鱼',
  '诗人', '画师', '骑士', '侠客', '船长', '水手', '猎人', '精灵',
  '微风', '小雨', '泡沫', '尘埃', '星辰', '烟火', '森林', '岛屿',
]

/** 网名符号后缀（装饰用） */
const nicknameSuffixes = [
  '', '', '', '', '', // 大部分不加后缀
  '°', '~', '✨', '💫', '☘️', '🌙', '⭐', '_',
]

// ============ 生成函数 ============

/** 随机取数组元素 */
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** 随机取 N 个不重复元素 */
function pickN<T>(arr: T[], n: number): T[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, n)
}

/**
 * 根据性别取名字用字
 * @param gender - 'male' | 'female' | 'random'
 */
function pickNameChars(gender: 'male' | 'female' | 'random'): string[] {
  let pool: string[]
  if (gender === 'male') {
    pool = maleNameChars
  } else if (gender === 'female') {
    pool = femaleNameChars
  } else {
    pool = [...maleNameChars, ...femaleNameChars]
  }
  return pickN(pool, 3) // 多取几个备用
}

/**
 * 生成中文名
 * @param gender - 性别倾向
 * @param doubleName - 是否生成双名（两个字的 given name），默认随机
 */
export function generateChineseName(
  gender: 'male' | 'female' | 'random' = 'random',
  doubleName?: boolean,
): string {
  const surname = pick(surnames)
  const useDouble = doubleName ?? Math.random() > 0.3 // 70% 双名
  const chars = pickNameChars(gender)

  if (useDouble) {
    // 双名：姓 + 字1 + 字2
    return surname + chars[0] + chars[1]
  }
  // 单名：姓 + 字1
  return surname + chars[0]
}

/**
 * 生成英文名
 * @param gender - 性别倾向
 */
export function generateEnglishName(
  gender: 'male' | 'female' | 'random' = 'random',
): string {
  let firstName: string
  if (gender === 'male') {
    firstName = pick(maleEnglishNames)
  } else if (gender === 'female') {
    firstName = pick(femaleEnglishNames)
  } else {
    firstName = pick([...maleEnglishNames, ...femaleEnglishNames])
  }
  const lastName = pick(englishSurnames)
  return `${firstName} ${lastName}`
}

/**
 * 生成网名
 */
export function generateNickname(): string {
  const adj = pick(nicknameAdjectives)
  const noun = pick(nicknameNouns)
  const suffix = pick(nicknameSuffixes)
  return adj + noun + suffix
}

// ============ 统一生成入口 ============

/** 类型标签映射 */
const typeLabels: Record<NameType, string> = {
  chinese: '中文名',
  nickname: '网名',
  english: '英文名',
}

/**
 * 批量生成指定类型的名字
 * @param type - 名字类型
 * @param count - 生成数量
 * @param gender - 性别倾向（仅中文名和英文名有效）
 */
export function generateNames(
  type: NameType,
  count: number = 10,
  gender: 'male' | 'female' | 'random' = 'random',
): NameResult[] {
  const results: NameResult[] = []
  const label = typeLabels[type]

  for (let i = 0; i < count; i++) {
    let name: string
    switch (type) {
      case 'chinese':
        name = generateChineseName(gender)
        break
      case 'english':
        name = generateEnglishName(gender)
        break
      case 'nickname':
        name = generateNickname()
        break
    }
    results.push({ name, type, typeLabel: label })
  }

  return results
}
