/**
 * 中国身份证号生成 & 校验工具
 * 遵循 GB 11643-1999 标准
 * 行政区划数据来源：民政部 chinese_regions 包
 */
import regions from 'chinese_regions'

export interface RegionItem {
  code: number
  name: string
}

// 权重因子
const weightFactors = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
// 校验码映射
const checkCodeMap = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

/** 计算校验码 */
function calcCheckCode(id17: string): string {
  const sum = id17.split('').reduce((acc, digit, i) => acc + parseInt(digit) * weightFactors[i], 0)
  return checkCodeMap[sum % 11]
}

/** 获取所有省份列表 */
export function getProvinces(): RegionItem[] {
  return regions.province
}

/** 根据省份代码获取城市列表 */
export function getCitiesByProvince(provinceCode: number): RegionItem[] {
  return regions.city.filter(c => c.p_code === provinceCode)
}

/** 根据城市代码获取区县列表 */
export function getCountiesByCity(cityCode: number): RegionItem[] {
  return regions.county
    .filter(c => c.c_code === cityCode)
    .sort((a, b) => {
      // 排序：区 → 市 → 县 → 旗
      const order: Record<string, number> = { 区: 1, 市: 2, 县: 3, 旗: 4 }
      return (order[a.name.slice(-1)] || 99) - (order[b.name.slice(-1)] || 99)
    })
}

export interface IdCardOptions {
  provinceCode?: number   // 省份代码，筛选省份下的区县
  cityCode?: number       // 城市代码，筛选城市下的区县
  countyCode?: number     // 区县代码，精确到区县
  gender?: 'male' | 'female' | 'random'
  startYear?: number
  endYear?: number
  count?: number
}

export interface IdCardInfo {
  id: string
  province: string
  city: string
  district: string
  birthDate: string
  gender: string
  checkCode: string
  valid: boolean
}

/** 生成合法身份证号 */
export function generateIdCards(options: IdCardOptions = {}): IdCardInfo[] {
  const {
    provinceCode,
    cityCode,
    countyCode: targetCountyCode,
    gender = 'random',
    startYear = 1960,
    endYear = 2005,
    count = 1,
  } = options

  const results: IdCardInfo[] = []

  for (let i = 0; i < count; i++) {
    let areaCode: number
    let provinceName: string
    let cityName: string
    let districtName: string

    if (targetCountyCode) {
      // 精确到区县
      areaCode = targetCountyCode
      const county = regions.county.find(c => c.code === targetCountyCode)
      provinceName = county?.p_name || '未知'
      cityName = county?.c_name || '未知'
      districtName = county?.name || '未知'
    } else {
      // 按省/市筛选区县
      let pool = regions.county.filter(c => c.name !== '市辖区' && c.name !== '市辖县')
      if (cityCode) {
        pool = pool.filter(c => c.c_code === cityCode)
      } else if (provinceCode) {
        pool = pool.filter(c => c.p_code === provinceCode)
      }
      const county = randomElement(pool)
      areaCode = county.code
      provinceName = county.p_name
      cityName = county.c_name
      districtName = county.name
    }

    // 2. 出生日期
    const year = randomInt(startYear, endYear)
    const month = randomInt(1, 12)
    const maxDay = new Date(year, month, 0).getDate()
    const day = randomInt(1, maxDay)
    const birthDate = `${year}${String(month).padStart(2, '0')}${String(day).padStart(2, '0')}`

    // 3. 顺序码（3位，奇数为男，偶数为女）
    let seqBase: number
    if (gender === 'male') {
      seqBase = randomInt(0, 499) * 2 + 1
    } else if (gender === 'female') {
      seqBase = randomInt(0, 499) * 2
    } else {
      seqBase = randomInt(0, 999)
    }
    const seqCode = String(seqBase).padStart(3, '0')

    // 4. 组合前17位并计算校验码
    const areaCodeStr = String(areaCode).padStart(6, '0')
    const id17 = areaCodeStr + birthDate + seqCode
    const checkCode = calcCheckCode(id17)

    results.push({
      id: id17 + checkCode,
      province: provinceName,
      city: cityName,
      district: districtName,
      birthDate: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
      gender: parseInt(seqCode) % 2 === 0 ? '女' : '男',
      checkCode,
      valid: true,
    })
  }

  return results
}

/** 校验身份证号是否合法 */
export function validateIdCard(id: string): { valid: boolean; message: string } {
  if (id.length !== 18) {
    return { valid: false, message: '身份证号长度必须为18位' }
  }
  if (!/^\d{17}[\dXx]$/.test(id)) {
    return { valid: false, message: '身份证号格式不正确' }
  }
  const id17 = id.substring(0, 17)
  const expectedCheckCode = calcCheckCode(id17)
  if (expectedCheckCode !== id[17].toUpperCase()) {
    return { valid: false, message: `校验码不正确，期望值为 ${expectedCheckCode}` }
  }
  return { valid: true, message: '身份证号合法' }
}