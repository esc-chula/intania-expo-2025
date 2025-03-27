export default class Province {
  /** Harmonized System (HS) code. */
  #code: string;
  #name: string;

  /**
   * All provinces in Thailand.
   * 
   * @see {@link https://en.wikipedia.org/wiki/Provinces_of_Thailand#76_provinces_in_Thailand Wikipedia}
   */
  static readonly ALL = [
    new Province("KBI", "กระบี่"),
    new Province("BKK", "กรุงเทพมหานคร"),
    new Province("KRI", "กาญจนบุรี"),
    new Province("KSN", "กาฬสินธุ์"),
    new Province("KPT", "กำแพงเพชร"),
    new Province("KKN", "ขอนแก่น"),
    new Province("CTI", "จันทบุรี"),
    new Province("CCO", "ฉะเชิงเทรา"),
    new Province("CBI", "ชลบุรี"),
    new Province("CNT", "ชัยนาท"),
    new Province("CPM", "ชัยภูมิ"),
    new Province("CPN", "ชุมพร"),
    new Province("CRI", "เชียงราย"),
    new Province("CMI", "เชียงใหม่"),
    new Province("TRG", "ตรัง"),
    new Province("TRT", "ตราด"),
    new Province("TAK", "ตาก"),
    new Province("NYK", "นครนายก"),
    new Province("NPT", "นครปฐม"),
    new Province("NPM", "นครพนม"),
    new Province("NMA", "นครราชสีมา"),
    new Province("NRT", "นครศรีธรรมราช"),
    new Province("NSN", "นครสวรรค์"),
    new Province("NBI", "นนทบุรี"),
    new Province("NWT", "นราธิวาส"),
    new Province("NAN", "น่าน"),
    new Province("BKN", "บึงกาฬ"),
    new Province("BRM", "บุรีรัมย์"),
    new Province("PTE", "ปทุมธานี"),
    new Province("PKN", "ประจวบคีรีขันธ์"),
    new Province("PRI", "ปราจีนบุรี"),
    new Province("PTN", "ปัตตานี"),
    new Province("AYA", "พระนครศรีอยุธยา"),
    new Province("PYO", "พะเยา"),
    new Province("PNA", "พังงา"),
    new Province("PLG", "พัทลุง"),
    new Province("PCT", "พิจิตร"),
    new Province("PLK", "พิษณุโลก"),
    new Province("PBI", "เพชรบุรี"),
    new Province("PNB", "เพชรบูรณ์"),
    new Province("PRE", "แพร่"),
    new Province("PKT", "ภูเก็ต"),
    new Province("MKM", "มหาสารคาม"),
    new Province("MDH", "มุกดาหาร"),
    new Province("MSN", "แม่ฮ่องสอน"),
    new Province("YST", "ยโสธร"),
    new Province("YLA", "ยะลา"),
    new Province("RET", "ร้อยเอ็ด"),
    new Province("RNG", "ระนอง"),
    new Province("RYG", "ระยอง"),
    new Province("RBR", "ราชบุรี"),
    new Province("LRI", "ลพบุรี"),
    new Province("LPG", "ลำปาง"),
    new Province("LPN", "ลำพูน"),
    new Province("LEI", "เลย"),
    new Province("SSK", "ศรีสะเกษ"),
    new Province("SNK", "สกลนคร"),
    new Province("SKA", "สงขลา"),
    new Province("STN", "สตูล"),
    new Province("SPK", "สมุทรปราการ"),
    new Province("SKM", "สมุทรสงคราม"),
    new Province("SKN", "สมุทรสาคร"),
    new Province("SKW", "สระแก้ว"),
    new Province("SRI", "สระบุรี"),
    new Province("SBR", "สิงห์บุรี"),
    new Province("STI", "สุโขทัย"),
    new Province("SPB", "สุพรรณบุรี"),
    new Province("SNI", "สุราษฎร์ธานี"),
    new Province("SRN", "สุรินทร์"),
    new Province("NKI", "หนองคาย"),
    new Province("NBP", "หนองบัวลำภู"),
    new Province("ATG", "อ่างทอง"),
    new Province("ACR", "อำนาจเจริญ"),
    new Province("UDN", "อุดรธานี"),
    new Province("UTD", "อุตรดิตถ์"),
    new Province("UTI", "อุทัยธานี"),
    new Province("UBN", "อุบลราชธานี"),
  ];

  static fromCode(code: string) {
    return Province.ALL.find((province) => province.code === code);
  }

  constructor(code: string, name: string) {
    this.#code = code;
    this.#name = name;
  }

  // Standard getters
  get name() {
    return this.#name;
  }
  get code() {
    return this.#code;
  }
}
