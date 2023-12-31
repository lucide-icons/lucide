/// <reference types="preact" />
import { JSX, RefObject } from 'preact'

interface LucideProps extends Partial<Omit<JSX.SVGAttributes, "ref" | "size">> {
  key?: string | number;
  ref?: string | ((component: any) => any) | RefObject<any>;
  color?: string
  size?: string | number
  strokeWidth?: string | number
  absoluteStrokeWidth?: boolean
}

export type LucideIcon = (props: LucideProps) => JSX.Element;

export type IconNode = [elementName: keyof ReactSVG, attrs: Record<string, string>][]

export declare const createLucideIcon: (iconName: string, iconNode: IconNode) => LucideIcon;

// Generated icons
export declare const AArrowDown: LucideIcon;
export declare const AArrowUp: LucideIcon;
export declare const ALargeSmall: LucideIcon;
export declare const Accessibility: LucideIcon;
export declare const ActivitySquare: LucideIcon;
export declare const Activity: LucideIcon;
export declare const AirVent: LucideIcon;
export declare const Airplay: LucideIcon;
export declare const AlarmClockCheck: LucideIcon;
export declare const AlarmClockMinus: LucideIcon;
export declare const AlarmClockOff: LucideIcon;
export declare const AlarmClockPlus: LucideIcon;
export declare const AlarmClock: LucideIcon;
export declare const AlarmSmoke: LucideIcon;
export declare const Album: LucideIcon;
export declare const AlertCircle: LucideIcon;
export declare const AlertOctagon: LucideIcon;
export declare const AlertTriangle: LucideIcon;
export declare const AlignCenterHorizontal: LucideIcon;
export declare const AlignCenterVertical: LucideIcon;
export declare const AlignCenter: LucideIcon;
export declare const AlignEndHorizontal: LucideIcon;
export declare const AlignEndVertical: LucideIcon;
export declare const AlignHorizontalDistributeCenter: LucideIcon;
export declare const AlignHorizontalDistributeEnd: LucideIcon;
export declare const AlignHorizontalDistributeStart: LucideIcon;
export declare const AlignHorizontalJustifyCenter: LucideIcon;
export declare const AlignHorizontalJustifyEnd: LucideIcon;
export declare const AlignHorizontalJustifyStart: LucideIcon;
export declare const AlignHorizontalSpaceAround: LucideIcon;
export declare const AlignHorizontalSpaceBetween: LucideIcon;
export declare const AlignJustify: LucideIcon;
export declare const AlignLeft: LucideIcon;
export declare const AlignRight: LucideIcon;
export declare const AlignStartHorizontal: LucideIcon;
export declare const AlignStartVertical: LucideIcon;
export declare const AlignVerticalDistributeCenter: LucideIcon;
export declare const AlignVerticalDistributeEnd: LucideIcon;
export declare const AlignVerticalDistributeStart: LucideIcon;
export declare const AlignVerticalJustifyCenter: LucideIcon;
export declare const AlignVerticalJustifyEnd: LucideIcon;
export declare const AlignVerticalJustifyStart: LucideIcon;
export declare const AlignVerticalSpaceAround: LucideIcon;
export declare const AlignVerticalSpaceBetween: LucideIcon;
export declare const Ampersand: LucideIcon;
export declare const Ampersands: LucideIcon;
export declare const Anchor: LucideIcon;
export declare const Angry: LucideIcon;
export declare const Annoyed: LucideIcon;
export declare const Antenna: LucideIcon;
export declare const Anvil: LucideIcon;
export declare const Aperture: LucideIcon;
export declare const AppWindow: LucideIcon;
export declare const Apple: LucideIcon;
export declare const ArchiveRestore: LucideIcon;
export declare const ArchiveX: LucideIcon;
export declare const Archive: LucideIcon;
export declare const AreaChart: LucideIcon;
export declare const Armchair: LucideIcon;
export declare const ArrowBigDownDash: LucideIcon;
export declare const ArrowBigDown: LucideIcon;
export declare const ArrowBigLeftDash: LucideIcon;
export declare const ArrowBigLeft: LucideIcon;
export declare const ArrowBigRightDash: LucideIcon;
export declare const ArrowBigRight: LucideIcon;
export declare const ArrowBigUpDash: LucideIcon;
export declare const ArrowBigUp: LucideIcon;
export declare const ArrowDown01: LucideIcon;
export declare const ArrowDown10: LucideIcon;
export declare const ArrowDownAZ: LucideIcon;
export declare const ArrowDownCircle: LucideIcon;
export declare const ArrowDownFromLine: LucideIcon;
export declare const ArrowDownLeftFromCircle: LucideIcon;
export declare const ArrowDownLeftSquare: LucideIcon;
export declare const ArrowDownLeft: LucideIcon;
export declare const ArrowDownNarrowWide: LucideIcon;
export declare const ArrowDownRightFromCircle: LucideIcon;
export declare const ArrowDownRightSquare: LucideIcon;
export declare const ArrowDownRight: LucideIcon;
export declare const ArrowDownSquare: LucideIcon;
export declare const ArrowDownToDot: LucideIcon;
export declare const ArrowDownToLine: LucideIcon;
export declare const ArrowDownUp: LucideIcon;
export declare const ArrowDownWideNarrow: LucideIcon;
export declare const ArrowDownZA: LucideIcon;
export declare const ArrowDown: LucideIcon;
export declare const ArrowLeftCircle: LucideIcon;
export declare const ArrowLeftFromLine: LucideIcon;
export declare const ArrowLeftRight: LucideIcon;
export declare const ArrowLeftSquare: LucideIcon;
export declare const ArrowLeftToLine: LucideIcon;
export declare const ArrowLeft: LucideIcon;
export declare const ArrowRightCircle: LucideIcon;
export declare const ArrowRightFromLine: LucideIcon;
export declare const ArrowRightLeft: LucideIcon;
export declare const ArrowRightSquare: LucideIcon;
export declare const ArrowRightToLine: LucideIcon;
export declare const ArrowRight: LucideIcon;
export declare const ArrowUp01: LucideIcon;
export declare const ArrowUp10: LucideIcon;
export declare const ArrowUpAZ: LucideIcon;
export declare const ArrowUpCircle: LucideIcon;
export declare const ArrowUpDown: LucideIcon;
export declare const ArrowUpFromDot: LucideIcon;
export declare const ArrowUpFromLine: LucideIcon;
export declare const ArrowUpLeftFromCircle: LucideIcon;
export declare const ArrowUpLeftSquare: LucideIcon;
export declare const ArrowUpLeft: LucideIcon;
export declare const ArrowUpNarrowWide: LucideIcon;
export declare const ArrowUpRightFromCircle: LucideIcon;
export declare const ArrowUpRightSquare: LucideIcon;
export declare const ArrowUpRight: LucideIcon;
export declare const ArrowUpSquare: LucideIcon;
export declare const ArrowUpToLine: LucideIcon;
export declare const ArrowUpWideNarrow: LucideIcon;
export declare const ArrowUpZA: LucideIcon;
export declare const ArrowUp: LucideIcon;
export declare const ArrowsUpFromLine: LucideIcon;
export declare const Asterisk: LucideIcon;
export declare const AtSign: LucideIcon;
export declare const Atom: LucideIcon;
export declare const AudioLines: LucideIcon;
export declare const AudioWaveform: LucideIcon;
export declare const Award: LucideIcon;
export declare const Axe: LucideIcon;
export declare const Axis3d: LucideIcon;
export declare const Baby: LucideIcon;
export declare const Backpack: LucideIcon;
export declare const BadgeAlert: LucideIcon;
export declare const BadgeCent: LucideIcon;
export declare const BadgeCheck: LucideIcon;
export declare const BadgeDollarSign: LucideIcon;
export declare const BadgeEuro: LucideIcon;
export declare const BadgeHelp: LucideIcon;
export declare const BadgeIndianRupee: LucideIcon;
export declare const BadgeInfo: LucideIcon;
export declare const BadgeJapaneseYen: LucideIcon;
export declare const BadgeMinus: LucideIcon;
export declare const BadgePercent: LucideIcon;
export declare const BadgePlus: LucideIcon;
export declare const BadgePoundSterling: LucideIcon;
export declare const BadgeRussianRuble: LucideIcon;
export declare const BadgeSwissFranc: LucideIcon;
export declare const BadgeX: LucideIcon;
export declare const Badge: LucideIcon;
export declare const BaggageClaim: LucideIcon;
export declare const Ban: LucideIcon;
export declare const Banana: LucideIcon;
export declare const Banknote: LucideIcon;
export declare const BarChart2: LucideIcon;
export declare const BarChart3: LucideIcon;
export declare const BarChart4: LucideIcon;
export declare const BarChartBig: LucideIcon;
export declare const BarChartHorizontalBig: LucideIcon;
export declare const BarChartHorizontal: LucideIcon;
export declare const BarChart: LucideIcon;
export declare const Barcode: LucideIcon;
export declare const Baseline: LucideIcon;
export declare const Bath: LucideIcon;
export declare const BatteryCharging: LucideIcon;
export declare const BatteryFull: LucideIcon;
export declare const BatteryLow: LucideIcon;
export declare const BatteryMedium: LucideIcon;
export declare const BatteryWarning: LucideIcon;
export declare const Battery: LucideIcon;
export declare const Beaker: LucideIcon;
export declare const BeanOff: LucideIcon;
export declare const Bean: LucideIcon;
export declare const BedDouble: LucideIcon;
export declare const BedSingle: LucideIcon;
export declare const Bed: LucideIcon;
export declare const Beef: LucideIcon;
export declare const Beer: LucideIcon;
export declare const BellDot: LucideIcon;
export declare const BellElectric: LucideIcon;
export declare const BellMinus: LucideIcon;
export declare const BellOff: LucideIcon;
export declare const BellPlus: LucideIcon;
export declare const BellRing: LucideIcon;
export declare const Bell: LucideIcon;
export declare const Bike: LucideIcon;
export declare const Binary: LucideIcon;
export declare const Biohazard: LucideIcon;
export declare const Bird: LucideIcon;
export declare const Bitcoin: LucideIcon;
export declare const Blinds: LucideIcon;
export declare const Blocks: LucideIcon;
export declare const BluetoothConnected: LucideIcon;
export declare const BluetoothOff: LucideIcon;
export declare const BluetoothSearching: LucideIcon;
export declare const Bluetooth: LucideIcon;
export declare const Bold: LucideIcon;
export declare const Bomb: LucideIcon;
export declare const Bone: LucideIcon;
export declare const BookA: LucideIcon;
export declare const BookAudio: LucideIcon;
export declare const BookCheck: LucideIcon;
export declare const BookCopy: LucideIcon;
export declare const BookDashed: LucideIcon;
export declare const BookDown: LucideIcon;
export declare const BookHeadphones: LucideIcon;
export declare const BookHeart: LucideIcon;
export declare const BookImage: LucideIcon;
export declare const BookKey: LucideIcon;
export declare const BookLock: LucideIcon;
export declare const BookMarked: LucideIcon;
export declare const BookMinus: LucideIcon;
export declare const BookOpenCheck: LucideIcon;
export declare const BookOpenText: LucideIcon;
export declare const BookOpen: LucideIcon;
export declare const BookPlus: LucideIcon;
export declare const BookText: LucideIcon;
export declare const BookType: LucideIcon;
export declare const BookUp2: LucideIcon;
export declare const BookUp: LucideIcon;
export declare const BookUser: LucideIcon;
export declare const BookX: LucideIcon;
export declare const Book: LucideIcon;
export declare const BookmarkCheck: LucideIcon;
export declare const BookmarkMinus: LucideIcon;
export declare const BookmarkPlus: LucideIcon;
export declare const BookmarkX: LucideIcon;
export declare const Bookmark: LucideIcon;
export declare const BoomBox: LucideIcon;
export declare const Bot: LucideIcon;
export declare const BoxSelect: LucideIcon;
export declare const Box: LucideIcon;
export declare const Boxes: LucideIcon;
export declare const Braces: LucideIcon;
export declare const Brackets: LucideIcon;
export declare const BrainCircuit: LucideIcon;
export declare const BrainCog: LucideIcon;
export declare const Brain: LucideIcon;
export declare const BrickWall: LucideIcon;
export declare const Briefcase: LucideIcon;
export declare const BringToFront: LucideIcon;
export declare const Brush: LucideIcon;
export declare const BugOff: LucideIcon;
export declare const BugPlay: LucideIcon;
export declare const Bug: LucideIcon;
export declare const Building2: LucideIcon;
export declare const Building: LucideIcon;
export declare const BusFront: LucideIcon;
export declare const Bus: LucideIcon;
export declare const CableCar: LucideIcon;
export declare const Cable: LucideIcon;
export declare const CakeSlice: LucideIcon;
export declare const Cake: LucideIcon;
export declare const Calculator: LucideIcon;
export declare const CalendarCheck2: LucideIcon;
export declare const CalendarCheck: LucideIcon;
export declare const CalendarClock: LucideIcon;
export declare const CalendarDays: LucideIcon;
export declare const CalendarHeart: LucideIcon;
export declare const CalendarMinus: LucideIcon;
export declare const CalendarOff: LucideIcon;
export declare const CalendarPlus: LucideIcon;
export declare const CalendarRange: LucideIcon;
export declare const CalendarSearch: LucideIcon;
export declare const CalendarX2: LucideIcon;
export declare const CalendarX: LucideIcon;
export declare const Calendar: LucideIcon;
export declare const CameraOff: LucideIcon;
export declare const Camera: LucideIcon;
export declare const CandlestickChart: LucideIcon;
export declare const CandyCane: LucideIcon;
export declare const CandyOff: LucideIcon;
export declare const Candy: LucideIcon;
export declare const CarFront: LucideIcon;
export declare const CarTaxiFront: LucideIcon;
export declare const Car: LucideIcon;
export declare const Caravan: LucideIcon;
export declare const Carrot: LucideIcon;
export declare const CaseLower: LucideIcon;
export declare const CaseSensitive: LucideIcon;
export declare const CaseUpper: LucideIcon;
export declare const CassetteTape: LucideIcon;
export declare const Cast: LucideIcon;
export declare const Castle: LucideIcon;
export declare const Cat: LucideIcon;
export declare const Cctv: LucideIcon;
export declare const CheckCheck: LucideIcon;
export declare const CheckCircle2: LucideIcon;
export declare const CheckCircle: LucideIcon;
export declare const CheckSquare2: LucideIcon;
export declare const CheckSquare: LucideIcon;
export declare const Check: LucideIcon;
export declare const ChefHat: LucideIcon;
export declare const Cherry: LucideIcon;
export declare const ChevronDownCircle: LucideIcon;
export declare const ChevronDownSquare: LucideIcon;
export declare const ChevronDown: LucideIcon;
export declare const ChevronFirst: LucideIcon;
export declare const ChevronLast: LucideIcon;
export declare const ChevronLeftCircle: LucideIcon;
export declare const ChevronLeftSquare: LucideIcon;
export declare const ChevronLeft: LucideIcon;
export declare const ChevronRightCircle: LucideIcon;
export declare const ChevronRightSquare: LucideIcon;
export declare const ChevronRight: LucideIcon;
export declare const ChevronUpCircle: LucideIcon;
export declare const ChevronUpSquare: LucideIcon;
export declare const ChevronUp: LucideIcon;
export declare const ChevronsDownUp: LucideIcon;
export declare const ChevronsDown: LucideIcon;
export declare const ChevronsLeftRight: LucideIcon;
export declare const ChevronsLeft: LucideIcon;
export declare const ChevronsRightLeft: LucideIcon;
export declare const ChevronsRight: LucideIcon;
export declare const ChevronsUpDown: LucideIcon;
export declare const ChevronsUp: LucideIcon;
export declare const Chrome: LucideIcon;
export declare const Church: LucideIcon;
export declare const CigaretteOff: LucideIcon;
export declare const Cigarette: LucideIcon;
export declare const CircleDashed: LucideIcon;
export declare const CircleDollarSign: LucideIcon;
export declare const CircleDotDashed: LucideIcon;
export declare const CircleDot: LucideIcon;
export declare const CircleEllipsis: LucideIcon;
export declare const CircleEqual: LucideIcon;
export declare const CircleOff: LucideIcon;
export declare const CircleSlash2: LucideIcon;
export declare const CircleSlash: LucideIcon;
export declare const CircleUserRound: LucideIcon;
export declare const CircleUser: LucideIcon;
export declare const Circle: LucideIcon;
export declare const CircuitBoard: LucideIcon;
export declare const Citrus: LucideIcon;
export declare const Clapperboard: LucideIcon;
export declare const ClipboardCheck: LucideIcon;
export declare const ClipboardCopy: LucideIcon;
export declare const ClipboardEdit: LucideIcon;
export declare const ClipboardList: LucideIcon;
export declare const ClipboardPaste: LucideIcon;
export declare const ClipboardSignature: LucideIcon;
export declare const ClipboardType: LucideIcon;
export declare const ClipboardX: LucideIcon;
export declare const Clipboard: LucideIcon;
export declare const Clock1: LucideIcon;
export declare const Clock10: LucideIcon;
export declare const Clock11: LucideIcon;
export declare const Clock12: LucideIcon;
export declare const Clock2: LucideIcon;
export declare const Clock3: LucideIcon;
export declare const Clock4: LucideIcon;
export declare const Clock5: LucideIcon;
export declare const Clock6: LucideIcon;
export declare const Clock7: LucideIcon;
export declare const Clock8: LucideIcon;
export declare const Clock9: LucideIcon;
export declare const Clock: LucideIcon;
export declare const CloudCog: LucideIcon;
export declare const CloudDrizzle: LucideIcon;
export declare const CloudFog: LucideIcon;
export declare const CloudHail: LucideIcon;
export declare const CloudLightning: LucideIcon;
export declare const CloudMoonRain: LucideIcon;
export declare const CloudMoon: LucideIcon;
export declare const CloudOff: LucideIcon;
export declare const CloudRainWind: LucideIcon;
export declare const CloudRain: LucideIcon;
export declare const CloudSnow: LucideIcon;
export declare const CloudSunRain: LucideIcon;
export declare const CloudSun: LucideIcon;
export declare const Cloud: LucideIcon;
export declare const Cloudy: LucideIcon;
export declare const Clover: LucideIcon;
export declare const Club: LucideIcon;
export declare const Code2: LucideIcon;
export declare const Code: LucideIcon;
export declare const Codepen: LucideIcon;
export declare const Codesandbox: LucideIcon;
export declare const Coffee: LucideIcon;
export declare const Cog: LucideIcon;
export declare const Coins: LucideIcon;
export declare const Columns2: LucideIcon;
export declare const Columns3: LucideIcon;
export declare const Columns4: LucideIcon;
export declare const Combine: LucideIcon;
export declare const Command: LucideIcon;
export declare const Compass: LucideIcon;
export declare const Component: LucideIcon;
export declare const Computer: LucideIcon;
export declare const ConciergeBell: LucideIcon;
export declare const Cone: LucideIcon;
export declare const Construction: LucideIcon;
export declare const Contact2: LucideIcon;
export declare const Contact: LucideIcon;
export declare const Container: LucideIcon;
export declare const Contrast: LucideIcon;
export declare const Cookie: LucideIcon;
export declare const CookingPot: LucideIcon;
export declare const CopyCheck: LucideIcon;
export declare const CopyMinus: LucideIcon;
export declare const CopyPlus: LucideIcon;
export declare const CopySlash: LucideIcon;
export declare const CopyX: LucideIcon;
export declare const Copy: LucideIcon;
export declare const Copyleft: LucideIcon;
export declare const Copyright: LucideIcon;
export declare const CornerDownLeft: LucideIcon;
export declare const CornerDownRight: LucideIcon;
export declare const CornerLeftDown: LucideIcon;
export declare const CornerLeftUp: LucideIcon;
export declare const CornerRightDown: LucideIcon;
export declare const CornerRightUp: LucideIcon;
export declare const CornerUpLeft: LucideIcon;
export declare const CornerUpRight: LucideIcon;
export declare const Cpu: LucideIcon;
export declare const CreativeCommons: LucideIcon;
export declare const CreditCard: LucideIcon;
export declare const Croissant: LucideIcon;
export declare const Crop: LucideIcon;
export declare const Cross: LucideIcon;
export declare const Crosshair: LucideIcon;
export declare const Crown: LucideIcon;
export declare const Cuboid: LucideIcon;
export declare const CupSoda: LucideIcon;
export declare const Currency: LucideIcon;
export declare const Cylinder: LucideIcon;
export declare const DatabaseBackup: LucideIcon;
export declare const DatabaseZap: LucideIcon;
export declare const Database: LucideIcon;
export declare const Delete: LucideIcon;
export declare const Dessert: LucideIcon;
export declare const Diameter: LucideIcon;
export declare const Diamond: LucideIcon;
export declare const Dice1: LucideIcon;
export declare const Dice2: LucideIcon;
export declare const Dice3: LucideIcon;
export declare const Dice4: LucideIcon;
export declare const Dice5: LucideIcon;
export declare const Dice6: LucideIcon;
export declare const Dices: LucideIcon;
export declare const Diff: LucideIcon;
export declare const Disc2: LucideIcon;
export declare const Disc3: LucideIcon;
export declare const DiscAlbum: LucideIcon;
export declare const Disc: LucideIcon;
export declare const DivideCircle: LucideIcon;
export declare const DivideSquare: LucideIcon;
export declare const Divide: LucideIcon;
export declare const DnaOff: LucideIcon;
export declare const Dna: LucideIcon;
export declare const Dog: LucideIcon;
export declare const DollarSign: LucideIcon;
export declare const Donut: LucideIcon;
export declare const DoorClosed: LucideIcon;
export declare const DoorOpen: LucideIcon;
export declare const Dot: LucideIcon;
export declare const DownloadCloud: LucideIcon;
export declare const Download: LucideIcon;
export declare const DraftingCompass: LucideIcon;
export declare const Drama: LucideIcon;
export declare const Dribbble: LucideIcon;
export declare const Droplet: LucideIcon;
export declare const Droplets: LucideIcon;
export declare const Drum: LucideIcon;
export declare const Drumstick: LucideIcon;
export declare const Dumbbell: LucideIcon;
export declare const EarOff: LucideIcon;
export declare const Ear: LucideIcon;
export declare const EggFried: LucideIcon;
export declare const EggOff: LucideIcon;
export declare const Egg: LucideIcon;
export declare const EqualNot: LucideIcon;
export declare const Equal: LucideIcon;
export declare const Eraser: LucideIcon;
export declare const Euro: LucideIcon;
export declare const Expand: LucideIcon;
export declare const ExternalLink: LucideIcon;
export declare const EyeOff: LucideIcon;
export declare const Eye: LucideIcon;
export declare const Facebook: LucideIcon;
export declare const Factory: LucideIcon;
export declare const Fan: LucideIcon;
export declare const FastForward: LucideIcon;
export declare const Feather: LucideIcon;
export declare const Fence: LucideIcon;
export declare const FerrisWheel: LucideIcon;
export declare const Figma: LucideIcon;
export declare const FileArchive: LucideIcon;
export declare const FileAudio2: LucideIcon;
export declare const FileAudio: LucideIcon;
export declare const FileAxis3d: LucideIcon;
export declare const FileBadge2: LucideIcon;
export declare const FileBadge: LucideIcon;
export declare const FileBarChart2: LucideIcon;
export declare const FileBarChart: LucideIcon;
export declare const FileBox: LucideIcon;
export declare const FileCheck2: LucideIcon;
export declare const FileCheck: LucideIcon;
export declare const FileClock: LucideIcon;
export declare const FileCode2: LucideIcon;
export declare const FileCode: LucideIcon;
export declare const FileCog: LucideIcon;
export declare const FileDiff: LucideIcon;
export declare const FileDigit: LucideIcon;
export declare const FileDown: LucideIcon;
export declare const FileEdit: LucideIcon;
export declare const FileHeart: LucideIcon;
export declare const FileImage: LucideIcon;
export declare const FileInput: LucideIcon;
export declare const FileJson2: LucideIcon;
export declare const FileJson: LucideIcon;
export declare const FileKey2: LucideIcon;
export declare const FileKey: LucideIcon;
export declare const FileLineChart: LucideIcon;
export declare const FileLock2: LucideIcon;
export declare const FileLock: LucideIcon;
export declare const FileMinus2: LucideIcon;
export declare const FileMinus: LucideIcon;
export declare const FileMusic: LucideIcon;
export declare const FileOutput: LucideIcon;
export declare const FilePieChart: LucideIcon;
export declare const FilePlus2: LucideIcon;
export declare const FilePlus: LucideIcon;
export declare const FileQuestion: LucideIcon;
export declare const FileScan: LucideIcon;
export declare const FileSearch2: LucideIcon;
export declare const FileSearch: LucideIcon;
export declare const FileSignature: LucideIcon;
export declare const FileSpreadsheet: LucideIcon;
export declare const FileStack: LucideIcon;
export declare const FileSymlink: LucideIcon;
export declare const FileTerminal: LucideIcon;
export declare const FileText: LucideIcon;
export declare const FileType2: LucideIcon;
export declare const FileType: LucideIcon;
export declare const FileUp: LucideIcon;
export declare const FileVideo2: LucideIcon;
export declare const FileVideo: LucideIcon;
export declare const FileVolume2: LucideIcon;
export declare const FileVolume: LucideIcon;
export declare const FileWarning: LucideIcon;
export declare const FileX2: LucideIcon;
export declare const FileX: LucideIcon;
export declare const File: LucideIcon;
export declare const Files: LucideIcon;
export declare const Film: LucideIcon;
export declare const FilterX: LucideIcon;
export declare const Filter: LucideIcon;
export declare const Fingerprint: LucideIcon;
export declare const FireExtinguisher: LucideIcon;
export declare const FishOff: LucideIcon;
export declare const FishSymbol: LucideIcon;
export declare const Fish: LucideIcon;
export declare const FlagOff: LucideIcon;
export declare const FlagTriangleLeft: LucideIcon;
export declare const FlagTriangleRight: LucideIcon;
export declare const Flag: LucideIcon;
export declare const FlameKindling: LucideIcon;
export declare const Flame: LucideIcon;
export declare const FlashlightOff: LucideIcon;
export declare const Flashlight: LucideIcon;
export declare const FlaskConicalOff: LucideIcon;
export declare const FlaskConical: LucideIcon;
export declare const FlaskRound: LucideIcon;
export declare const FlipHorizontal2: LucideIcon;
export declare const FlipHorizontal: LucideIcon;
export declare const FlipVertical2: LucideIcon;
export declare const FlipVertical: LucideIcon;
export declare const Flower2: LucideIcon;
export declare const Flower: LucideIcon;
export declare const Focus: LucideIcon;
export declare const FoldHorizontal: LucideIcon;
export declare const FoldVertical: LucideIcon;
export declare const FolderArchive: LucideIcon;
export declare const FolderCheck: LucideIcon;
export declare const FolderClock: LucideIcon;
export declare const FolderClosed: LucideIcon;
export declare const FolderCog: LucideIcon;
export declare const FolderDot: LucideIcon;
export declare const FolderDown: LucideIcon;
export declare const FolderEdit: LucideIcon;
export declare const FolderGit2: LucideIcon;
export declare const FolderGit: LucideIcon;
export declare const FolderHeart: LucideIcon;
export declare const FolderInput: LucideIcon;
export declare const FolderKanban: LucideIcon;
export declare const FolderKey: LucideIcon;
export declare const FolderLock: LucideIcon;
export declare const FolderMinus: LucideIcon;
export declare const FolderOpenDot: LucideIcon;
export declare const FolderOpen: LucideIcon;
export declare const FolderOutput: LucideIcon;
export declare const FolderPlus: LucideIcon;
export declare const FolderRoot: LucideIcon;
export declare const FolderSearch2: LucideIcon;
export declare const FolderSearch: LucideIcon;
export declare const FolderSymlink: LucideIcon;
export declare const FolderSync: LucideIcon;
export declare const FolderTree: LucideIcon;
export declare const FolderUp: LucideIcon;
export declare const FolderX: LucideIcon;
export declare const Folder: LucideIcon;
export declare const Folders: LucideIcon;
export declare const Footprints: LucideIcon;
export declare const Forklift: LucideIcon;
export declare const FormInput: LucideIcon;
export declare const Forward: LucideIcon;
export declare const Frame: LucideIcon;
export declare const Framer: LucideIcon;
export declare const Frown: LucideIcon;
export declare const Fuel: LucideIcon;
export declare const Fullscreen: LucideIcon;
export declare const FunctionSquare: LucideIcon;
export declare const GalleryHorizontalEnd: LucideIcon;
export declare const GalleryHorizontal: LucideIcon;
export declare const GalleryThumbnails: LucideIcon;
export declare const GalleryVerticalEnd: LucideIcon;
export declare const GalleryVertical: LucideIcon;
export declare const Gamepad2: LucideIcon;
export declare const Gamepad: LucideIcon;
export declare const GanttChartSquare: LucideIcon;
export declare const GanttChart: LucideIcon;
export declare const GaugeCircle: LucideIcon;
export declare const Gauge: LucideIcon;
export declare const Gavel: LucideIcon;
export declare const Gem: LucideIcon;
export declare const Ghost: LucideIcon;
export declare const Gift: LucideIcon;
export declare const GitBranchPlus: LucideIcon;
export declare const GitBranch: LucideIcon;
export declare const GitCommitHorizontal: LucideIcon;
export declare const GitCommitVertical: LucideIcon;
export declare const GitCompareArrows: LucideIcon;
export declare const GitCompare: LucideIcon;
export declare const GitFork: LucideIcon;
export declare const GitGraph: LucideIcon;
export declare const GitMerge: LucideIcon;
export declare const GitPullRequestArrow: LucideIcon;
export declare const GitPullRequestClosed: LucideIcon;
export declare const GitPullRequestCreateArrow: LucideIcon;
export declare const GitPullRequestCreate: LucideIcon;
export declare const GitPullRequestDraft: LucideIcon;
export declare const GitPullRequest: LucideIcon;
export declare const Github: LucideIcon;
export declare const Gitlab: LucideIcon;
export declare const GlassWater: LucideIcon;
export declare const Glasses: LucideIcon;
export declare const Globe2: LucideIcon;
export declare const Globe: LucideIcon;
export declare const Goal: LucideIcon;
export declare const Grab: LucideIcon;
export declare const GraduationCap: LucideIcon;
export declare const Grape: LucideIcon;
export declare const Grid2x2: LucideIcon;
export declare const Grid3x3: LucideIcon;
export declare const GripHorizontal: LucideIcon;
export declare const GripVertical: LucideIcon;
export declare const Grip: LucideIcon;
export declare const Group: LucideIcon;
export declare const Guitar: LucideIcon;
export declare const Hammer: LucideIcon;
export declare const HandMetal: LucideIcon;
export declare const Hand: LucideIcon;
export declare const HardDriveDownload: LucideIcon;
export declare const HardDriveUpload: LucideIcon;
export declare const HardDrive: LucideIcon;
export declare const HardHat: LucideIcon;
export declare const Hash: LucideIcon;
export declare const Haze: LucideIcon;
export declare const HdmiPort: LucideIcon;
export declare const Heading1: LucideIcon;
export declare const Heading2: LucideIcon;
export declare const Heading3: LucideIcon;
export declare const Heading4: LucideIcon;
export declare const Heading5: LucideIcon;
export declare const Heading6: LucideIcon;
export declare const Heading: LucideIcon;
export declare const Headphones: LucideIcon;
export declare const HeartCrack: LucideIcon;
export declare const HeartHandshake: LucideIcon;
export declare const HeartOff: LucideIcon;
export declare const HeartPulse: LucideIcon;
export declare const Heart: LucideIcon;
export declare const HelpCircle: LucideIcon;
export declare const HelpingHand: LucideIcon;
export declare const Hexagon: LucideIcon;
export declare const Highlighter: LucideIcon;
export declare const History: LucideIcon;
export declare const Home: LucideIcon;
export declare const HopOff: LucideIcon;
export declare const Hop: LucideIcon;
export declare const Hotel: LucideIcon;
export declare const Hourglass: LucideIcon;
export declare const IceCream2: LucideIcon;
export declare const IceCream: LucideIcon;
export declare const ImageDown: LucideIcon;
export declare const ImageMinus: LucideIcon;
export declare const ImageOff: LucideIcon;
export declare const ImagePlus: LucideIcon;
export declare const Image: LucideIcon;
export declare const Import: LucideIcon;
export declare const Inbox: LucideIcon;
export declare const Indent: LucideIcon;
export declare const IndianRupee: LucideIcon;
export declare const Infinity: LucideIcon;
export declare const Info: LucideIcon;
export declare const InspectionPanel: LucideIcon;
export declare const Instagram: LucideIcon;
export declare const Italic: LucideIcon;
export declare const IterationCcw: LucideIcon;
export declare const IterationCw: LucideIcon;
export declare const JapaneseYen: LucideIcon;
export declare const Joystick: LucideIcon;
export declare const KanbanSquareDashed: LucideIcon;
export declare const KanbanSquare: LucideIcon;
export declare const Kanban: LucideIcon;
export declare const KeyRound: LucideIcon;
export declare const KeySquare: LucideIcon;
export declare const Key: LucideIcon;
export declare const KeyboardMusic: LucideIcon;
export declare const Keyboard: LucideIcon;
export declare const LampCeiling: LucideIcon;
export declare const LampDesk: LucideIcon;
export declare const LampFloor: LucideIcon;
export declare const LampWallDown: LucideIcon;
export declare const LampWallUp: LucideIcon;
export declare const Lamp: LucideIcon;
export declare const LandPlot: LucideIcon;
export declare const Landmark: LucideIcon;
export declare const Languages: LucideIcon;
export declare const Laptop2: LucideIcon;
export declare const Laptop: LucideIcon;
export declare const LassoSelect: LucideIcon;
export declare const Lasso: LucideIcon;
export declare const Laugh: LucideIcon;
export declare const Layers2: LucideIcon;
export declare const Layers3: LucideIcon;
export declare const Layers: LucideIcon;
export declare const LayoutDashboard: LucideIcon;
export declare const LayoutGrid: LucideIcon;
export declare const LayoutList: LucideIcon;
export declare const LayoutPanelLeft: LucideIcon;
export declare const LayoutPanelTop: LucideIcon;
export declare const LayoutTemplate: LucideIcon;
export declare const Leaf: LucideIcon;
export declare const LeafyGreen: LucideIcon;
export declare const LibraryBig: LucideIcon;
export declare const LibrarySquare: LucideIcon;
export declare const Library: LucideIcon;
export declare const LifeBuoy: LucideIcon;
export declare const Ligature: LucideIcon;
export declare const LightbulbOff: LucideIcon;
export declare const Lightbulb: LucideIcon;
export declare const LineChart: LucideIcon;
export declare const Link2Off: LucideIcon;
export declare const Link2: LucideIcon;
export declare const Link: LucideIcon;
export declare const Linkedin: LucideIcon;
export declare const ListChecks: LucideIcon;
export declare const ListEnd: LucideIcon;
export declare const ListFilter: LucideIcon;
export declare const ListMinus: LucideIcon;
export declare const ListMusic: LucideIcon;
export declare const ListOrdered: LucideIcon;
export declare const ListPlus: LucideIcon;
export declare const ListRestart: LucideIcon;
export declare const ListStart: LucideIcon;
export declare const ListTodo: LucideIcon;
export declare const ListTree: LucideIcon;
export declare const ListVideo: LucideIcon;
export declare const ListX: LucideIcon;
export declare const List: LucideIcon;
export declare const Loader2: LucideIcon;
export declare const Loader: LucideIcon;
export declare const LocateFixed: LucideIcon;
export declare const LocateOff: LucideIcon;
export declare const Locate: LucideIcon;
export declare const LockKeyhole: LucideIcon;
export declare const Lock: LucideIcon;
export declare const LogIn: LucideIcon;
export declare const LogOut: LucideIcon;
export declare const Lollipop: LucideIcon;
export declare const Luggage: LucideIcon;
export declare const MSquare: LucideIcon;
export declare const Magnet: LucideIcon;
export declare const MailCheck: LucideIcon;
export declare const MailMinus: LucideIcon;
export declare const MailOpen: LucideIcon;
export declare const MailPlus: LucideIcon;
export declare const MailQuestion: LucideIcon;
export declare const MailSearch: LucideIcon;
export declare const MailWarning: LucideIcon;
export declare const MailX: LucideIcon;
export declare const Mail: LucideIcon;
export declare const Mailbox: LucideIcon;
export declare const Mails: LucideIcon;
export declare const MapPinOff: LucideIcon;
export declare const MapPin: LucideIcon;
export declare const MapPinned: LucideIcon;
export declare const Map: LucideIcon;
export declare const Martini: LucideIcon;
export declare const Maximize2: LucideIcon;
export declare const Maximize: LucideIcon;
export declare const Medal: LucideIcon;
export declare const MegaphoneOff: LucideIcon;
export declare const Megaphone: LucideIcon;
export declare const Meh: LucideIcon;
export declare const MemoryStick: LucideIcon;
export declare const MenuSquare: LucideIcon;
export declare const Menu: LucideIcon;
export declare const Merge: LucideIcon;
export declare const MessageCircleCode: LucideIcon;
export declare const MessageCircleDashed: LucideIcon;
export declare const MessageCircleHeart: LucideIcon;
export declare const MessageCircleMore: LucideIcon;
export declare const MessageCircleOff: LucideIcon;
export declare const MessageCirclePlus: LucideIcon;
export declare const MessageCircleQuestion: LucideIcon;
export declare const MessageCircleReply: LucideIcon;
export declare const MessageCircleWarning: LucideIcon;
export declare const MessageCircleX: LucideIcon;
export declare const MessageCircle: LucideIcon;
export declare const MessageSquareCode: LucideIcon;
export declare const MessageSquareDashed: LucideIcon;
export declare const MessageSquareDiff: LucideIcon;
export declare const MessageSquareDot: LucideIcon;
export declare const MessageSquareHeart: LucideIcon;
export declare const MessageSquareMore: LucideIcon;
export declare const MessageSquareOff: LucideIcon;
export declare const MessageSquarePlus: LucideIcon;
export declare const MessageSquareQuote: LucideIcon;
export declare const MessageSquareReply: LucideIcon;
export declare const MessageSquareShare: LucideIcon;
export declare const MessageSquareText: LucideIcon;
export declare const MessageSquareWarning: LucideIcon;
export declare const MessageSquareX: LucideIcon;
export declare const MessageSquare: LucideIcon;
export declare const MessagesSquare: LucideIcon;
export declare const Mic2: LucideIcon;
export declare const MicOff: LucideIcon;
export declare const Mic: LucideIcon;
export declare const Microscope: LucideIcon;
export declare const Microwave: LucideIcon;
export declare const Milestone: LucideIcon;
export declare const MilkOff: LucideIcon;
export declare const Milk: LucideIcon;
export declare const Minimize2: LucideIcon;
export declare const Minimize: LucideIcon;
export declare const MinusCircle: LucideIcon;
export declare const MinusSquare: LucideIcon;
export declare const Minus: LucideIcon;
export declare const MonitorCheck: LucideIcon;
export declare const MonitorDot: LucideIcon;
export declare const MonitorDown: LucideIcon;
export declare const MonitorOff: LucideIcon;
export declare const MonitorPause: LucideIcon;
export declare const MonitorPlay: LucideIcon;
export declare const MonitorSmartphone: LucideIcon;
export declare const MonitorSpeaker: LucideIcon;
export declare const MonitorStop: LucideIcon;
export declare const MonitorUp: LucideIcon;
export declare const MonitorX: LucideIcon;
export declare const Monitor: LucideIcon;
export declare const MoonStar: LucideIcon;
export declare const Moon: LucideIcon;
export declare const MoreHorizontal: LucideIcon;
export declare const MoreVertical: LucideIcon;
export declare const MountainSnow: LucideIcon;
export declare const Mountain: LucideIcon;
export declare const MousePointer2: LucideIcon;
export declare const MousePointerClick: LucideIcon;
export declare const MousePointerSquareDashed: LucideIcon;
export declare const MousePointerSquare: LucideIcon;
export declare const MousePointer: LucideIcon;
export declare const Mouse: LucideIcon;
export declare const Move3d: LucideIcon;
export declare const MoveDiagonal2: LucideIcon;
export declare const MoveDiagonal: LucideIcon;
export declare const MoveDownLeft: LucideIcon;
export declare const MoveDownRight: LucideIcon;
export declare const MoveDown: LucideIcon;
export declare const MoveHorizontal: LucideIcon;
export declare const MoveLeft: LucideIcon;
export declare const MoveRight: LucideIcon;
export declare const MoveUpLeft: LucideIcon;
export declare const MoveUpRight: LucideIcon;
export declare const MoveUp: LucideIcon;
export declare const MoveVertical: LucideIcon;
export declare const Move: LucideIcon;
export declare const Music2: LucideIcon;
export declare const Music3: LucideIcon;
export declare const Music4: LucideIcon;
export declare const Music: LucideIcon;
export declare const Navigation2Off: LucideIcon;
export declare const Navigation2: LucideIcon;
export declare const NavigationOff: LucideIcon;
export declare const Navigation: LucideIcon;
export declare const Network: LucideIcon;
export declare const Newspaper: LucideIcon;
export declare const Nfc: LucideIcon;
export declare const NutOff: LucideIcon;
export declare const Nut: LucideIcon;
export declare const Octagon: LucideIcon;
export declare const Option: LucideIcon;
export declare const Orbit: LucideIcon;
export declare const Outdent: LucideIcon;
export declare const Package2: LucideIcon;
export declare const PackageCheck: LucideIcon;
export declare const PackageMinus: LucideIcon;
export declare const PackageOpen: LucideIcon;
export declare const PackagePlus: LucideIcon;
export declare const PackageSearch: LucideIcon;
export declare const PackageX: LucideIcon;
export declare const Package: LucideIcon;
export declare const PaintBucket: LucideIcon;
export declare const Paintbrush2: LucideIcon;
export declare const Paintbrush: LucideIcon;
export declare const Palette: LucideIcon;
export declare const Palmtree: LucideIcon;
export declare const PanelBottomClose: LucideIcon;
export declare const PanelBottomDashed: LucideIcon;
export declare const PanelBottomOpen: LucideIcon;
export declare const PanelBottom: LucideIcon;
export declare const PanelLeftClose: LucideIcon;
export declare const PanelLeftDashed: LucideIcon;
export declare const PanelLeftOpen: LucideIcon;
export declare const PanelLeft: LucideIcon;
export declare const PanelRightClose: LucideIcon;
export declare const PanelRightDashed: LucideIcon;
export declare const PanelRightOpen: LucideIcon;
export declare const PanelRight: LucideIcon;
export declare const PanelTopClose: LucideIcon;
export declare const PanelTopDashed: LucideIcon;
export declare const PanelTopOpen: LucideIcon;
export declare const PanelTop: LucideIcon;
export declare const PanelsLeftBottom: LucideIcon;
export declare const PanelsRightBottom: LucideIcon;
export declare const PanelsTopLeft: LucideIcon;
export declare const Paperclip: LucideIcon;
export declare const Parentheses: LucideIcon;
export declare const ParkingCircleOff: LucideIcon;
export declare const ParkingCircle: LucideIcon;
export declare const ParkingMeter: LucideIcon;
export declare const ParkingSquareOff: LucideIcon;
export declare const ParkingSquare: LucideIcon;
export declare const PartyPopper: LucideIcon;
export declare const PauseCircle: LucideIcon;
export declare const PauseOctagon: LucideIcon;
export declare const Pause: LucideIcon;
export declare const PawPrint: LucideIcon;
export declare const PcCase: LucideIcon;
export declare const PenLine: LucideIcon;
export declare const PenSquare: LucideIcon;
export declare const PenTool: LucideIcon;
export declare const Pen: LucideIcon;
export declare const PencilLine: LucideIcon;
export declare const PencilRuler: LucideIcon;
export declare const Pencil: LucideIcon;
export declare const Pentagon: LucideIcon;
export declare const PercentCircle: LucideIcon;
export declare const PercentDiamond: LucideIcon;
export declare const PercentSquare: LucideIcon;
export declare const Percent: LucideIcon;
export declare const PersonStanding: LucideIcon;
export declare const PhoneCall: LucideIcon;
export declare const PhoneForwarded: LucideIcon;
export declare const PhoneIncoming: LucideIcon;
export declare const PhoneMissed: LucideIcon;
export declare const PhoneOff: LucideIcon;
export declare const PhoneOutgoing: LucideIcon;
export declare const Phone: LucideIcon;
export declare const PiSquare: LucideIcon;
export declare const Pi: LucideIcon;
export declare const Piano: LucideIcon;
export declare const PictureInPicture2: LucideIcon;
export declare const PictureInPicture: LucideIcon;
export declare const PieChart: LucideIcon;
export declare const PiggyBank: LucideIcon;
export declare const PilcrowSquare: LucideIcon;
export declare const Pilcrow: LucideIcon;
export declare const Pill: LucideIcon;
export declare const PinOff: LucideIcon;
export declare const Pin: LucideIcon;
export declare const Pipette: LucideIcon;
export declare const Pizza: LucideIcon;
export declare const PlaneLanding: LucideIcon;
export declare const PlaneTakeoff: LucideIcon;
export declare const Plane: LucideIcon;
export declare const PlayCircle: LucideIcon;
export declare const PlaySquare: LucideIcon;
export declare const Play: LucideIcon;
export declare const Plug2: LucideIcon;
export declare const PlugZap2: LucideIcon;
export declare const PlugZap: LucideIcon;
export declare const Plug: LucideIcon;
export declare const PlusCircle: LucideIcon;
export declare const PlusSquare: LucideIcon;
export declare const Plus: LucideIcon;
export declare const PocketKnife: LucideIcon;
export declare const Pocket: LucideIcon;
export declare const Podcast: LucideIcon;
export declare const PointerOff: LucideIcon;
export declare const Pointer: LucideIcon;
export declare const Popcorn: LucideIcon;
export declare const Popsicle: LucideIcon;
export declare const PoundSterling: LucideIcon;
export declare const PowerCircle: LucideIcon;
export declare const PowerOff: LucideIcon;
export declare const PowerSquare: LucideIcon;
export declare const Power: LucideIcon;
export declare const Presentation: LucideIcon;
export declare const Printer: LucideIcon;
export declare const Projector: LucideIcon;
export declare const Puzzle: LucideIcon;
export declare const Pyramid: LucideIcon;
export declare const QrCode: LucideIcon;
export declare const Quote: LucideIcon;
export declare const Rabbit: LucideIcon;
export declare const Radar: LucideIcon;
export declare const Radiation: LucideIcon;
export declare const RadioReceiver: LucideIcon;
export declare const RadioTower: LucideIcon;
export declare const Radio: LucideIcon;
export declare const Radius: LucideIcon;
export declare const RailSymbol: LucideIcon;
export declare const Rainbow: LucideIcon;
export declare const Rat: LucideIcon;
export declare const Ratio: LucideIcon;
export declare const Receipt: LucideIcon;
export declare const RectangleHorizontal: LucideIcon;
export declare const RectangleVertical: LucideIcon;
export declare const Recycle: LucideIcon;
export declare const Redo2: LucideIcon;
export declare const RedoDot: LucideIcon;
export declare const Redo: LucideIcon;
export declare const RefreshCcwDot: LucideIcon;
export declare const RefreshCcw: LucideIcon;
export declare const RefreshCwOff: LucideIcon;
export declare const RefreshCw: LucideIcon;
export declare const Refrigerator: LucideIcon;
export declare const Regex: LucideIcon;
export declare const RemoveFormatting: LucideIcon;
export declare const Repeat1: LucideIcon;
export declare const Repeat2: LucideIcon;
export declare const Repeat: LucideIcon;
export declare const ReplaceAll: LucideIcon;
export declare const Replace: LucideIcon;
export declare const ReplyAll: LucideIcon;
export declare const Reply: LucideIcon;
export declare const Rewind: LucideIcon;
export declare const Ribbon: LucideIcon;
export declare const Rocket: LucideIcon;
export declare const RockingChair: LucideIcon;
export declare const RollerCoaster: LucideIcon;
export declare const Rotate3d: LucideIcon;
export declare const RotateCcw: LucideIcon;
export declare const RotateCw: LucideIcon;
export declare const RouteOff: LucideIcon;
export declare const Route: LucideIcon;
export declare const Router: LucideIcon;
export declare const Rows2: LucideIcon;
export declare const Rows3: LucideIcon;
export declare const Rows4: LucideIcon;
export declare const Rss: LucideIcon;
export declare const Ruler: LucideIcon;
export declare const RussianRuble: LucideIcon;
export declare const Sailboat: LucideIcon;
export declare const Salad: LucideIcon;
export declare const Sandwich: LucideIcon;
export declare const SatelliteDish: LucideIcon;
export declare const Satellite: LucideIcon;
export declare const SaveAll: LucideIcon;
export declare const Save: LucideIcon;
export declare const Scale3d: LucideIcon;
export declare const Scale: LucideIcon;
export declare const Scaling: LucideIcon;
export declare const ScanBarcode: LucideIcon;
export declare const ScanEye: LucideIcon;
export declare const ScanFace: LucideIcon;
export declare const ScanLine: LucideIcon;
export declare const ScanSearch: LucideIcon;
export declare const ScanText: LucideIcon;
export declare const Scan: LucideIcon;
export declare const ScatterChart: LucideIcon;
export declare const School2: LucideIcon;
export declare const School: LucideIcon;
export declare const ScissorsLineDashed: LucideIcon;
export declare const ScissorsSquareDashedBottom: LucideIcon;
export declare const ScissorsSquare: LucideIcon;
export declare const Scissors: LucideIcon;
export declare const ScreenShareOff: LucideIcon;
export declare const ScreenShare: LucideIcon;
export declare const ScrollText: LucideIcon;
export declare const Scroll: LucideIcon;
export declare const SearchCheck: LucideIcon;
export declare const SearchCode: LucideIcon;
export declare const SearchSlash: LucideIcon;
export declare const SearchX: LucideIcon;
export declare const Search: LucideIcon;
export declare const SendHorizontal: LucideIcon;
export declare const SendToBack: LucideIcon;
export declare const Send: LucideIcon;
export declare const SeparatorHorizontal: LucideIcon;
export declare const SeparatorVertical: LucideIcon;
export declare const ServerCog: LucideIcon;
export declare const ServerCrash: LucideIcon;
export declare const ServerOff: LucideIcon;
export declare const Server: LucideIcon;
export declare const Settings2: LucideIcon;
export declare const Settings: LucideIcon;
export declare const Shapes: LucideIcon;
export declare const Share2: LucideIcon;
export declare const Share: LucideIcon;
export declare const Sheet: LucideIcon;
export declare const Shell: LucideIcon;
export declare const ShieldAlert: LucideIcon;
export declare const ShieldBan: LucideIcon;
export declare const ShieldCheck: LucideIcon;
export declare const ShieldEllipsis: LucideIcon;
export declare const ShieldHalf: LucideIcon;
export declare const ShieldMinus: LucideIcon;
export declare const ShieldOff: LucideIcon;
export declare const ShieldPlus: LucideIcon;
export declare const ShieldQuestion: LucideIcon;
export declare const ShieldX: LucideIcon;
export declare const Shield: LucideIcon;
export declare const ShipWheel: LucideIcon;
export declare const Ship: LucideIcon;
export declare const Shirt: LucideIcon;
export declare const ShoppingBag: LucideIcon;
export declare const ShoppingBasket: LucideIcon;
export declare const ShoppingCart: LucideIcon;
export declare const Shovel: LucideIcon;
export declare const ShowerHead: LucideIcon;
export declare const Shrink: LucideIcon;
export declare const Shrub: LucideIcon;
export declare const Shuffle: LucideIcon;
export declare const SigmaSquare: LucideIcon;
export declare const Sigma: LucideIcon;
export declare const SignalHigh: LucideIcon;
export declare const SignalLow: LucideIcon;
export declare const SignalMedium: LucideIcon;
export declare const SignalZero: LucideIcon;
export declare const Signal: LucideIcon;
export declare const SignpostBig: LucideIcon;
export declare const Signpost: LucideIcon;
export declare const Siren: LucideIcon;
export declare const SkipBack: LucideIcon;
export declare const SkipForward: LucideIcon;
export declare const Skull: LucideIcon;
export declare const Slack: LucideIcon;
export declare const Slash: LucideIcon;
export declare const Slice: LucideIcon;
export declare const SlidersHorizontal: LucideIcon;
export declare const Sliders: LucideIcon;
export declare const SmartphoneCharging: LucideIcon;
export declare const SmartphoneNfc: LucideIcon;
export declare const Smartphone: LucideIcon;
export declare const SmilePlus: LucideIcon;
export declare const Smile: LucideIcon;
export declare const Snail: LucideIcon;
export declare const Snowflake: LucideIcon;
export declare const Sofa: LucideIcon;
export declare const Soup: LucideIcon;
export declare const Space: LucideIcon;
export declare const Spade: LucideIcon;
export declare const Sparkle: LucideIcon;
export declare const Sparkles: LucideIcon;
export declare const Speaker: LucideIcon;
export declare const Speech: LucideIcon;
export declare const SpellCheck2: LucideIcon;
export declare const SpellCheck: LucideIcon;
export declare const Spline: LucideIcon;
export declare const SplitSquareHorizontal: LucideIcon;
export declare const SplitSquareVertical: LucideIcon;
export declare const Split: LucideIcon;
export declare const SprayCan: LucideIcon;
export declare const Sprout: LucideIcon;
export declare const SquareAsterisk: LucideIcon;
export declare const SquareCode: LucideIcon;
export declare const SquareDashedBottomCode: LucideIcon;
export declare const SquareDashedBottom: LucideIcon;
export declare const SquareDot: LucideIcon;
export declare const SquareEqual: LucideIcon;
export declare const SquareSlash: LucideIcon;
export declare const SquareStack: LucideIcon;
export declare const SquareUserRound: LucideIcon;
export declare const SquareUser: LucideIcon;
export declare const Square: LucideIcon;
export declare const Squircle: LucideIcon;
export declare const Squirrel: LucideIcon;
export declare const Stamp: LucideIcon;
export declare const StarHalf: LucideIcon;
export declare const StarOff: LucideIcon;
export declare const Star: LucideIcon;
export declare const StepBack: LucideIcon;
export declare const StepForward: LucideIcon;
export declare const Stethoscope: LucideIcon;
export declare const Sticker: LucideIcon;
export declare const StickyNote: LucideIcon;
export declare const StopCircle: LucideIcon;
export declare const Store: LucideIcon;
export declare const StretchHorizontal: LucideIcon;
export declare const StretchVertical: LucideIcon;
export declare const Strikethrough: LucideIcon;
export declare const Subscript: LucideIcon;
export declare const Subtitles: LucideIcon;
export declare const SunDim: LucideIcon;
export declare const SunMedium: LucideIcon;
export declare const SunMoon: LucideIcon;
export declare const SunSnow: LucideIcon;
export declare const Sun: LucideIcon;
export declare const Sunrise: LucideIcon;
export declare const Sunset: LucideIcon;
export declare const Superscript: LucideIcon;
export declare const SwissFranc: LucideIcon;
export declare const SwitchCamera: LucideIcon;
export declare const Sword: LucideIcon;
export declare const Swords: LucideIcon;
export declare const Syringe: LucideIcon;
export declare const Table2: LucideIcon;
export declare const TableProperties: LucideIcon;
export declare const Table: LucideIcon;
export declare const TabletSmartphone: LucideIcon;
export declare const Tablet: LucideIcon;
export declare const Tablets: LucideIcon;
export declare const Tag: LucideIcon;
export declare const Tags: LucideIcon;
export declare const Tally1: LucideIcon;
export declare const Tally2: LucideIcon;
export declare const Tally3: LucideIcon;
export declare const Tally4: LucideIcon;
export declare const Tally5: LucideIcon;
export declare const Tangent: LucideIcon;
export declare const Target: LucideIcon;
export declare const TentTree: LucideIcon;
export declare const Tent: LucideIcon;
export declare const TerminalSquare: LucideIcon;
export declare const Terminal: LucideIcon;
export declare const TestTube2: LucideIcon;
export declare const TestTube: LucideIcon;
export declare const TestTubes: LucideIcon;
export declare const TextCursorInput: LucideIcon;
export declare const TextCursor: LucideIcon;
export declare const TextQuote: LucideIcon;
export declare const TextSelect: LucideIcon;
export declare const Text: LucideIcon;
export declare const Theater: LucideIcon;
export declare const ThermometerSnowflake: LucideIcon;
export declare const ThermometerSun: LucideIcon;
export declare const Thermometer: LucideIcon;
export declare const ThumbsDown: LucideIcon;
export declare const ThumbsUp: LucideIcon;
export declare const Ticket: LucideIcon;
export declare const TimerOff: LucideIcon;
export declare const TimerReset: LucideIcon;
export declare const Timer: LucideIcon;
export declare const ToggleLeft: LucideIcon;
export declare const ToggleRight: LucideIcon;
export declare const Tornado: LucideIcon;
export declare const Torus: LucideIcon;
export declare const TouchpadOff: LucideIcon;
export declare const Touchpad: LucideIcon;
export declare const TowerControl: LucideIcon;
export declare const ToyBrick: LucideIcon;
export declare const Tractor: LucideIcon;
export declare const TrafficCone: LucideIcon;
export declare const TrainFrontTunnel: LucideIcon;
export declare const TrainFront: LucideIcon;
export declare const TrainTrack: LucideIcon;
export declare const TramFront: LucideIcon;
export declare const Trash2: LucideIcon;
export declare const Trash: LucideIcon;
export declare const TreeDeciduous: LucideIcon;
export declare const TreePine: LucideIcon;
export declare const Trees: LucideIcon;
export declare const Trello: LucideIcon;
export declare const TrendingDown: LucideIcon;
export declare const TrendingUp: LucideIcon;
export declare const TriangleRight: LucideIcon;
export declare const Triangle: LucideIcon;
export declare const Trophy: LucideIcon;
export declare const Truck: LucideIcon;
export declare const Turtle: LucideIcon;
export declare const Tv2: LucideIcon;
export declare const Tv: LucideIcon;
export declare const Twitch: LucideIcon;
export declare const Twitter: LucideIcon;
export declare const Type: LucideIcon;
export declare const UmbrellaOff: LucideIcon;
export declare const Umbrella: LucideIcon;
export declare const Underline: LucideIcon;
export declare const Undo2: LucideIcon;
export declare const UndoDot: LucideIcon;
export declare const Undo: LucideIcon;
export declare const UnfoldHorizontal: LucideIcon;
export declare const UnfoldVertical: LucideIcon;
export declare const Ungroup: LucideIcon;
export declare const Unlink2: LucideIcon;
export declare const Unlink: LucideIcon;
export declare const UnlockKeyhole: LucideIcon;
export declare const Unlock: LucideIcon;
export declare const Unplug: LucideIcon;
export declare const UploadCloud: LucideIcon;
export declare const Upload: LucideIcon;
export declare const Usb: LucideIcon;
export declare const UserCheck: LucideIcon;
export declare const UserCog: LucideIcon;
export declare const UserMinus: LucideIcon;
export declare const UserPlus: LucideIcon;
export declare const UserRoundCheck: LucideIcon;
export declare const UserRoundCog: LucideIcon;
export declare const UserRoundMinus: LucideIcon;
export declare const UserRoundPlus: LucideIcon;
export declare const UserRoundSearch: LucideIcon;
export declare const UserRoundX: LucideIcon;
export declare const UserRound: LucideIcon;
export declare const UserSearch: LucideIcon;
export declare const UserX: LucideIcon;
export declare const User: LucideIcon;
export declare const UsersRound: LucideIcon;
export declare const Users: LucideIcon;
export declare const UtensilsCrossed: LucideIcon;
export declare const Utensils: LucideIcon;
export declare const UtilityPole: LucideIcon;
export declare const Variable: LucideIcon;
export declare const Vegan: LucideIcon;
export declare const VenetianMask: LucideIcon;
export declare const VibrateOff: LucideIcon;
export declare const Vibrate: LucideIcon;
export declare const VideoOff: LucideIcon;
export declare const Video: LucideIcon;
export declare const Videotape: LucideIcon;
export declare const View: LucideIcon;
export declare const Voicemail: LucideIcon;
export declare const Volume1: LucideIcon;
export declare const Volume2: LucideIcon;
export declare const VolumeX: LucideIcon;
export declare const Volume: LucideIcon;
export declare const Vote: LucideIcon;
export declare const Wallet2: LucideIcon;
export declare const WalletCards: LucideIcon;
export declare const Wallet: LucideIcon;
export declare const Wallpaper: LucideIcon;
export declare const Wand2: LucideIcon;
export declare const Wand: LucideIcon;
export declare const Warehouse: LucideIcon;
export declare const Watch: LucideIcon;
export declare const Waves: LucideIcon;
export declare const Waypoints: LucideIcon;
export declare const Webcam: LucideIcon;
export declare const Webhook: LucideIcon;
export declare const Weight: LucideIcon;
export declare const WheatOff: LucideIcon;
export declare const Wheat: LucideIcon;
export declare const WholeWord: LucideIcon;
export declare const WifiOff: LucideIcon;
export declare const Wifi: LucideIcon;
export declare const Wind: LucideIcon;
export declare const WineOff: LucideIcon;
export declare const Wine: LucideIcon;
export declare const Workflow: LucideIcon;
export declare const WrapText: LucideIcon;
export declare const Wrench: LucideIcon;
export declare const XCircle: LucideIcon;
export declare const XOctagon: LucideIcon;
export declare const XSquare: LucideIcon;
export declare const X: LucideIcon;
export declare const Youtube: LucideIcon;
export declare const ZapOff: LucideIcon;
export declare const Zap: LucideIcon;
export declare const ZoomIn: LucideIcon;
export declare const ZoomOut: LucideIcon;

// Generated icon aliases

// AArrowDown aliases
export declare const AArrowDownIcon: LucideIcon;
export declare const LucideAArrowDown: LucideIcon;

// AArrowUp aliases
export declare const AArrowUpIcon: LucideIcon;
export declare const LucideAArrowUp: LucideIcon;

// ALargeSmall aliases
export declare const ALargeSmallIcon: LucideIcon;
export declare const LucideALargeSmall: LucideIcon;

// Accessibility aliases
export declare const AccessibilityIcon: LucideIcon;
export declare const LucideAccessibility: LucideIcon;

// ActivitySquare aliases
export declare const ActivitySquareIcon: LucideIcon;
export declare const LucideActivitySquare: LucideIcon;

// Activity aliases
export declare const ActivityIcon: LucideIcon;
export declare const LucideActivity: LucideIcon;

// AirVent aliases
export declare const AirVentIcon: LucideIcon;
export declare const LucideAirVent: LucideIcon;

// Airplay aliases
export declare const AirplayIcon: LucideIcon;
export declare const LucideAirplay: LucideIcon;

// AlarmClockCheck aliases
export declare const AlarmClockCheckIcon: LucideIcon;
export declare const LucideAlarmClockCheck: LucideIcon;
export declare const AlarmCheck: LucideIcon;

// AlarmClockMinus aliases
export declare const AlarmClockMinusIcon: LucideIcon;
export declare const LucideAlarmClockMinus: LucideIcon;
export declare const AlarmMinus: LucideIcon;

// AlarmClockOff aliases
export declare const AlarmClockOffIcon: LucideIcon;
export declare const LucideAlarmClockOff: LucideIcon;

// AlarmClockPlus aliases
export declare const AlarmClockPlusIcon: LucideIcon;
export declare const LucideAlarmClockPlus: LucideIcon;
export declare const AlarmPlus: LucideIcon;

// AlarmClock aliases
export declare const AlarmClockIcon: LucideIcon;
export declare const LucideAlarmClock: LucideIcon;

// AlarmSmoke aliases
export declare const AlarmSmokeIcon: LucideIcon;
export declare const LucideAlarmSmoke: LucideIcon;

// Album aliases
export declare const AlbumIcon: LucideIcon;
export declare const LucideAlbum: LucideIcon;

// AlertCircle aliases
export declare const AlertCircleIcon: LucideIcon;
export declare const LucideAlertCircle: LucideIcon;

// AlertOctagon aliases
export declare const AlertOctagonIcon: LucideIcon;
export declare const LucideAlertOctagon: LucideIcon;

// AlertTriangle aliases
export declare const AlertTriangleIcon: LucideIcon;
export declare const LucideAlertTriangle: LucideIcon;

// AlignCenterHorizontal aliases
export declare const AlignCenterHorizontalIcon: LucideIcon;
export declare const LucideAlignCenterHorizontal: LucideIcon;

// AlignCenterVertical aliases
export declare const AlignCenterVerticalIcon: LucideIcon;
export declare const LucideAlignCenterVertical: LucideIcon;

// AlignCenter aliases
export declare const AlignCenterIcon: LucideIcon;
export declare const LucideAlignCenter: LucideIcon;

// AlignEndHorizontal aliases
export declare const AlignEndHorizontalIcon: LucideIcon;
export declare const LucideAlignEndHorizontal: LucideIcon;

// AlignEndVertical aliases
export declare const AlignEndVerticalIcon: LucideIcon;
export declare const LucideAlignEndVertical: LucideIcon;

// AlignHorizontalDistributeCenter aliases
export declare const AlignHorizontalDistributeCenterIcon: LucideIcon;
export declare const LucideAlignHorizontalDistributeCenter: LucideIcon;

// AlignHorizontalDistributeEnd aliases
export declare const AlignHorizontalDistributeEndIcon: LucideIcon;
export declare const LucideAlignHorizontalDistributeEnd: LucideIcon;

// AlignHorizontalDistributeStart aliases
export declare const AlignHorizontalDistributeStartIcon: LucideIcon;
export declare const LucideAlignHorizontalDistributeStart: LucideIcon;

// AlignHorizontalJustifyCenter aliases
export declare const AlignHorizontalJustifyCenterIcon: LucideIcon;
export declare const LucideAlignHorizontalJustifyCenter: LucideIcon;

// AlignHorizontalJustifyEnd aliases
export declare const AlignHorizontalJustifyEndIcon: LucideIcon;
export declare const LucideAlignHorizontalJustifyEnd: LucideIcon;

// AlignHorizontalJustifyStart aliases
export declare const AlignHorizontalJustifyStartIcon: LucideIcon;
export declare const LucideAlignHorizontalJustifyStart: LucideIcon;

// AlignHorizontalSpaceAround aliases
export declare const AlignHorizontalSpaceAroundIcon: LucideIcon;
export declare const LucideAlignHorizontalSpaceAround: LucideIcon;

// AlignHorizontalSpaceBetween aliases
export declare const AlignHorizontalSpaceBetweenIcon: LucideIcon;
export declare const LucideAlignHorizontalSpaceBetween: LucideIcon;

// AlignJustify aliases
export declare const AlignJustifyIcon: LucideIcon;
export declare const LucideAlignJustify: LucideIcon;

// AlignLeft aliases
export declare const AlignLeftIcon: LucideIcon;
export declare const LucideAlignLeft: LucideIcon;

// AlignRight aliases
export declare const AlignRightIcon: LucideIcon;
export declare const LucideAlignRight: LucideIcon;

// AlignStartHorizontal aliases
export declare const AlignStartHorizontalIcon: LucideIcon;
export declare const LucideAlignStartHorizontal: LucideIcon;

// AlignStartVertical aliases
export declare const AlignStartVerticalIcon: LucideIcon;
export declare const LucideAlignStartVertical: LucideIcon;

// AlignVerticalDistributeCenter aliases
export declare const AlignVerticalDistributeCenterIcon: LucideIcon;
export declare const LucideAlignVerticalDistributeCenter: LucideIcon;

// AlignVerticalDistributeEnd aliases
export declare const AlignVerticalDistributeEndIcon: LucideIcon;
export declare const LucideAlignVerticalDistributeEnd: LucideIcon;

// AlignVerticalDistributeStart aliases
export declare const AlignVerticalDistributeStartIcon: LucideIcon;
export declare const LucideAlignVerticalDistributeStart: LucideIcon;

// AlignVerticalJustifyCenter aliases
export declare const AlignVerticalJustifyCenterIcon: LucideIcon;
export declare const LucideAlignVerticalJustifyCenter: LucideIcon;

// AlignVerticalJustifyEnd aliases
export declare const AlignVerticalJustifyEndIcon: LucideIcon;
export declare const LucideAlignVerticalJustifyEnd: LucideIcon;

// AlignVerticalJustifyStart aliases
export declare const AlignVerticalJustifyStartIcon: LucideIcon;
export declare const LucideAlignVerticalJustifyStart: LucideIcon;

// AlignVerticalSpaceAround aliases
export declare const AlignVerticalSpaceAroundIcon: LucideIcon;
export declare const LucideAlignVerticalSpaceAround: LucideIcon;

// AlignVerticalSpaceBetween aliases
export declare const AlignVerticalSpaceBetweenIcon: LucideIcon;
export declare const LucideAlignVerticalSpaceBetween: LucideIcon;

// Ampersand aliases
export declare const AmpersandIcon: LucideIcon;
export declare const LucideAmpersand: LucideIcon;

// Ampersands aliases
export declare const AmpersandsIcon: LucideIcon;
export declare const LucideAmpersands: LucideIcon;

// Anchor aliases
export declare const AnchorIcon: LucideIcon;
export declare const LucideAnchor: LucideIcon;

// Angry aliases
export declare const AngryIcon: LucideIcon;
export declare const LucideAngry: LucideIcon;

// Annoyed aliases
export declare const AnnoyedIcon: LucideIcon;
export declare const LucideAnnoyed: LucideIcon;

// Antenna aliases
export declare const AntennaIcon: LucideIcon;
export declare const LucideAntenna: LucideIcon;

// Anvil aliases
export declare const AnvilIcon: LucideIcon;
export declare const LucideAnvil: LucideIcon;

// Aperture aliases
export declare const ApertureIcon: LucideIcon;
export declare const LucideAperture: LucideIcon;

// AppWindow aliases
export declare const AppWindowIcon: LucideIcon;
export declare const LucideAppWindow: LucideIcon;

// Apple aliases
export declare const AppleIcon: LucideIcon;
export declare const LucideApple: LucideIcon;

// ArchiveRestore aliases
export declare const ArchiveRestoreIcon: LucideIcon;
export declare const LucideArchiveRestore: LucideIcon;

// ArchiveX aliases
export declare const ArchiveXIcon: LucideIcon;
export declare const LucideArchiveX: LucideIcon;

// Archive aliases
export declare const ArchiveIcon: LucideIcon;
export declare const LucideArchive: LucideIcon;

// AreaChart aliases
export declare const AreaChartIcon: LucideIcon;
export declare const LucideAreaChart: LucideIcon;

// Armchair aliases
export declare const ArmchairIcon: LucideIcon;
export declare const LucideArmchair: LucideIcon;

// ArrowBigDownDash aliases
export declare const ArrowBigDownDashIcon: LucideIcon;
export declare const LucideArrowBigDownDash: LucideIcon;

// ArrowBigDown aliases
export declare const ArrowBigDownIcon: LucideIcon;
export declare const LucideArrowBigDown: LucideIcon;

// ArrowBigLeftDash aliases
export declare const ArrowBigLeftDashIcon: LucideIcon;
export declare const LucideArrowBigLeftDash: LucideIcon;

// ArrowBigLeft aliases
export declare const ArrowBigLeftIcon: LucideIcon;
export declare const LucideArrowBigLeft: LucideIcon;

// ArrowBigRightDash aliases
export declare const ArrowBigRightDashIcon: LucideIcon;
export declare const LucideArrowBigRightDash: LucideIcon;

// ArrowBigRight aliases
export declare const ArrowBigRightIcon: LucideIcon;
export declare const LucideArrowBigRight: LucideIcon;

// ArrowBigUpDash aliases
export declare const ArrowBigUpDashIcon: LucideIcon;
export declare const LucideArrowBigUpDash: LucideIcon;

// ArrowBigUp aliases
export declare const ArrowBigUpIcon: LucideIcon;
export declare const LucideArrowBigUp: LucideIcon;

// ArrowDown01 aliases
export declare const ArrowDown01Icon: LucideIcon;
export declare const LucideArrowDown01: LucideIcon;
export declare const ArrowDown01: LucideIcon;

// ArrowDown10 aliases
export declare const ArrowDown10Icon: LucideIcon;
export declare const LucideArrowDown10: LucideIcon;
export declare const ArrowDown10: LucideIcon;

// ArrowDownAZ aliases
export declare const ArrowDownAZIcon: LucideIcon;
export declare const LucideArrowDownAZ: LucideIcon;
export declare const ArrowDownAz: LucideIcon;

// ArrowDownCircle aliases
export declare const ArrowDownCircleIcon: LucideIcon;
export declare const LucideArrowDownCircle: LucideIcon;

// ArrowDownFromLine aliases
export declare const ArrowDownFromLineIcon: LucideIcon;
export declare const LucideArrowDownFromLine: LucideIcon;

// ArrowDownLeftFromCircle aliases
export declare const ArrowDownLeftFromCircleIcon: LucideIcon;
export declare const LucideArrowDownLeftFromCircle: LucideIcon;

// ArrowDownLeftSquare aliases
export declare const ArrowDownLeftSquareIcon: LucideIcon;
export declare const LucideArrowDownLeftSquare: LucideIcon;

// ArrowDownLeft aliases
export declare const ArrowDownLeftIcon: LucideIcon;
export declare const LucideArrowDownLeft: LucideIcon;

// ArrowDownNarrowWide aliases
export declare const ArrowDownNarrowWideIcon: LucideIcon;
export declare const LucideArrowDownNarrowWide: LucideIcon;

// ArrowDownRightFromCircle aliases
export declare const ArrowDownRightFromCircleIcon: LucideIcon;
export declare const LucideArrowDownRightFromCircle: LucideIcon;

// ArrowDownRightSquare aliases
export declare const ArrowDownRightSquareIcon: LucideIcon;
export declare const LucideArrowDownRightSquare: LucideIcon;

// ArrowDownRight aliases
export declare const ArrowDownRightIcon: LucideIcon;
export declare const LucideArrowDownRight: LucideIcon;

// ArrowDownSquare aliases
export declare const ArrowDownSquareIcon: LucideIcon;
export declare const LucideArrowDownSquare: LucideIcon;

// ArrowDownToDot aliases
export declare const ArrowDownToDotIcon: LucideIcon;
export declare const LucideArrowDownToDot: LucideIcon;

// ArrowDownToLine aliases
export declare const ArrowDownToLineIcon: LucideIcon;
export declare const LucideArrowDownToLine: LucideIcon;

// ArrowDownUp aliases
export declare const ArrowDownUpIcon: LucideIcon;
export declare const LucideArrowDownUp: LucideIcon;

// ArrowDownWideNarrow aliases
export declare const ArrowDownWideNarrowIcon: LucideIcon;
export declare const LucideArrowDownWideNarrow: LucideIcon;
export declare const SortDesc: LucideIcon;

// ArrowDownZA aliases
export declare const ArrowDownZAIcon: LucideIcon;
export declare const LucideArrowDownZA: LucideIcon;
export declare const ArrowDownZa: LucideIcon;

// ArrowDown aliases
export declare const ArrowDownIcon: LucideIcon;
export declare const LucideArrowDown: LucideIcon;

// ArrowLeftCircle aliases
export declare const ArrowLeftCircleIcon: LucideIcon;
export declare const LucideArrowLeftCircle: LucideIcon;

// ArrowLeftFromLine aliases
export declare const ArrowLeftFromLineIcon: LucideIcon;
export declare const LucideArrowLeftFromLine: LucideIcon;

// ArrowLeftRight aliases
export declare const ArrowLeftRightIcon: LucideIcon;
export declare const LucideArrowLeftRight: LucideIcon;

// ArrowLeftSquare aliases
export declare const ArrowLeftSquareIcon: LucideIcon;
export declare const LucideArrowLeftSquare: LucideIcon;

// ArrowLeftToLine aliases
export declare const ArrowLeftToLineIcon: LucideIcon;
export declare const LucideArrowLeftToLine: LucideIcon;

// ArrowLeft aliases
export declare const ArrowLeftIcon: LucideIcon;
export declare const LucideArrowLeft: LucideIcon;

// ArrowRightCircle aliases
export declare const ArrowRightCircleIcon: LucideIcon;
export declare const LucideArrowRightCircle: LucideIcon;

// ArrowRightFromLine aliases
export declare const ArrowRightFromLineIcon: LucideIcon;
export declare const LucideArrowRightFromLine: LucideIcon;

// ArrowRightLeft aliases
export declare const ArrowRightLeftIcon: LucideIcon;
export declare const LucideArrowRightLeft: LucideIcon;

// ArrowRightSquare aliases
export declare const ArrowRightSquareIcon: LucideIcon;
export declare const LucideArrowRightSquare: LucideIcon;

// ArrowRightToLine aliases
export declare const ArrowRightToLineIcon: LucideIcon;
export declare const LucideArrowRightToLine: LucideIcon;

// ArrowRight aliases
export declare const ArrowRightIcon: LucideIcon;
export declare const LucideArrowRight: LucideIcon;

// ArrowUp01 aliases
export declare const ArrowUp01Icon: LucideIcon;
export declare const LucideArrowUp01: LucideIcon;
export declare const ArrowUp01: LucideIcon;

// ArrowUp10 aliases
export declare const ArrowUp10Icon: LucideIcon;
export declare const LucideArrowUp10: LucideIcon;
export declare const ArrowUp10: LucideIcon;

// ArrowUpAZ aliases
export declare const ArrowUpAZIcon: LucideIcon;
export declare const LucideArrowUpAZ: LucideIcon;
export declare const ArrowUpAz: LucideIcon;

// ArrowUpCircle aliases
export declare const ArrowUpCircleIcon: LucideIcon;
export declare const LucideArrowUpCircle: LucideIcon;

// ArrowUpDown aliases
export declare const ArrowUpDownIcon: LucideIcon;
export declare const LucideArrowUpDown: LucideIcon;

// ArrowUpFromDot aliases
export declare const ArrowUpFromDotIcon: LucideIcon;
export declare const LucideArrowUpFromDot: LucideIcon;

// ArrowUpFromLine aliases
export declare const ArrowUpFromLineIcon: LucideIcon;
export declare const LucideArrowUpFromLine: LucideIcon;

// ArrowUpLeftFromCircle aliases
export declare const ArrowUpLeftFromCircleIcon: LucideIcon;
export declare const LucideArrowUpLeftFromCircle: LucideIcon;

// ArrowUpLeftSquare aliases
export declare const ArrowUpLeftSquareIcon: LucideIcon;
export declare const LucideArrowUpLeftSquare: LucideIcon;

// ArrowUpLeft aliases
export declare const ArrowUpLeftIcon: LucideIcon;
export declare const LucideArrowUpLeft: LucideIcon;

// ArrowUpNarrowWide aliases
export declare const ArrowUpNarrowWideIcon: LucideIcon;
export declare const LucideArrowUpNarrowWide: LucideIcon;
export declare const SortAsc: LucideIcon;

// ArrowUpRightFromCircle aliases
export declare const ArrowUpRightFromCircleIcon: LucideIcon;
export declare const LucideArrowUpRightFromCircle: LucideIcon;

// ArrowUpRightSquare aliases
export declare const ArrowUpRightSquareIcon: LucideIcon;
export declare const LucideArrowUpRightSquare: LucideIcon;

// ArrowUpRight aliases
export declare const ArrowUpRightIcon: LucideIcon;
export declare const LucideArrowUpRight: LucideIcon;

// ArrowUpSquare aliases
export declare const ArrowUpSquareIcon: LucideIcon;
export declare const LucideArrowUpSquare: LucideIcon;

// ArrowUpToLine aliases
export declare const ArrowUpToLineIcon: LucideIcon;
export declare const LucideArrowUpToLine: LucideIcon;

// ArrowUpWideNarrow aliases
export declare const ArrowUpWideNarrowIcon: LucideIcon;
export declare const LucideArrowUpWideNarrow: LucideIcon;

// ArrowUpZA aliases
export declare const ArrowUpZAIcon: LucideIcon;
export declare const LucideArrowUpZA: LucideIcon;
export declare const ArrowUpZa: LucideIcon;

// ArrowUp aliases
export declare const ArrowUpIcon: LucideIcon;
export declare const LucideArrowUp: LucideIcon;

// ArrowsUpFromLine aliases
export declare const ArrowsUpFromLineIcon: LucideIcon;
export declare const LucideArrowsUpFromLine: LucideIcon;

// Asterisk aliases
export declare const AsteriskIcon: LucideIcon;
export declare const LucideAsterisk: LucideIcon;

// AtSign aliases
export declare const AtSignIcon: LucideIcon;
export declare const LucideAtSign: LucideIcon;

// Atom aliases
export declare const AtomIcon: LucideIcon;
export declare const LucideAtom: LucideIcon;

// AudioLines aliases
export declare const AudioLinesIcon: LucideIcon;
export declare const LucideAudioLines: LucideIcon;

// AudioWaveform aliases
export declare const AudioWaveformIcon: LucideIcon;
export declare const LucideAudioWaveform: LucideIcon;

// Award aliases
export declare const AwardIcon: LucideIcon;
export declare const LucideAward: LucideIcon;

// Axe aliases
export declare const AxeIcon: LucideIcon;
export declare const LucideAxe: LucideIcon;

// Axis3d aliases
export declare const Axis3dIcon: LucideIcon;
export declare const LucideAxis3d: LucideIcon;
export declare const Axis3D: LucideIcon;

// Baby aliases
export declare const BabyIcon: LucideIcon;
export declare const LucideBaby: LucideIcon;

// Backpack aliases
export declare const BackpackIcon: LucideIcon;
export declare const LucideBackpack: LucideIcon;

// BadgeAlert aliases
export declare const BadgeAlertIcon: LucideIcon;
export declare const LucideBadgeAlert: LucideIcon;

// BadgeCent aliases
export declare const BadgeCentIcon: LucideIcon;
export declare const LucideBadgeCent: LucideIcon;

// BadgeCheck aliases
export declare const BadgeCheckIcon: LucideIcon;
export declare const LucideBadgeCheck: LucideIcon;
export declare const Verified: LucideIcon;

// BadgeDollarSign aliases
export declare const BadgeDollarSignIcon: LucideIcon;
export declare const LucideBadgeDollarSign: LucideIcon;

// BadgeEuro aliases
export declare const BadgeEuroIcon: LucideIcon;
export declare const LucideBadgeEuro: LucideIcon;

// BadgeHelp aliases
export declare const BadgeHelpIcon: LucideIcon;
export declare const LucideBadgeHelp: LucideIcon;

// BadgeIndianRupee aliases
export declare const BadgeIndianRupeeIcon: LucideIcon;
export declare const LucideBadgeIndianRupee: LucideIcon;

// BadgeInfo aliases
export declare const BadgeInfoIcon: LucideIcon;
export declare const LucideBadgeInfo: LucideIcon;

// BadgeJapaneseYen aliases
export declare const BadgeJapaneseYenIcon: LucideIcon;
export declare const LucideBadgeJapaneseYen: LucideIcon;

// BadgeMinus aliases
export declare const BadgeMinusIcon: LucideIcon;
export declare const LucideBadgeMinus: LucideIcon;

// BadgePercent aliases
export declare const BadgePercentIcon: LucideIcon;
export declare const LucideBadgePercent: LucideIcon;

// BadgePlus aliases
export declare const BadgePlusIcon: LucideIcon;
export declare const LucideBadgePlus: LucideIcon;

// BadgePoundSterling aliases
export declare const BadgePoundSterlingIcon: LucideIcon;
export declare const LucideBadgePoundSterling: LucideIcon;

// BadgeRussianRuble aliases
export declare const BadgeRussianRubleIcon: LucideIcon;
export declare const LucideBadgeRussianRuble: LucideIcon;

// BadgeSwissFranc aliases
export declare const BadgeSwissFrancIcon: LucideIcon;
export declare const LucideBadgeSwissFranc: LucideIcon;

// BadgeX aliases
export declare const BadgeXIcon: LucideIcon;
export declare const LucideBadgeX: LucideIcon;

// Badge aliases
export declare const BadgeIcon: LucideIcon;
export declare const LucideBadge: LucideIcon;

// BaggageClaim aliases
export declare const BaggageClaimIcon: LucideIcon;
export declare const LucideBaggageClaim: LucideIcon;

// Ban aliases
export declare const BanIcon: LucideIcon;
export declare const LucideBan: LucideIcon;

// Banana aliases
export declare const BananaIcon: LucideIcon;
export declare const LucideBanana: LucideIcon;

// Banknote aliases
export declare const BanknoteIcon: LucideIcon;
export declare const LucideBanknote: LucideIcon;

// BarChart2 aliases
export declare const BarChart2Icon: LucideIcon;
export declare const LucideBarChart2: LucideIcon;

// BarChart3 aliases
export declare const BarChart3Icon: LucideIcon;
export declare const LucideBarChart3: LucideIcon;

// BarChart4 aliases
export declare const BarChart4Icon: LucideIcon;
export declare const LucideBarChart4: LucideIcon;

// BarChartBig aliases
export declare const BarChartBigIcon: LucideIcon;
export declare const LucideBarChartBig: LucideIcon;

// BarChartHorizontalBig aliases
export declare const BarChartHorizontalBigIcon: LucideIcon;
export declare const LucideBarChartHorizontalBig: LucideIcon;

// BarChartHorizontal aliases
export declare const BarChartHorizontalIcon: LucideIcon;
export declare const LucideBarChartHorizontal: LucideIcon;

// BarChart aliases
export declare const BarChartIcon: LucideIcon;
export declare const LucideBarChart: LucideIcon;

// Barcode aliases
export declare const BarcodeIcon: LucideIcon;
export declare const LucideBarcode: LucideIcon;

// Baseline aliases
export declare const BaselineIcon: LucideIcon;
export declare const LucideBaseline: LucideIcon;

// Bath aliases
export declare const BathIcon: LucideIcon;
export declare const LucideBath: LucideIcon;

// BatteryCharging aliases
export declare const BatteryChargingIcon: LucideIcon;
export declare const LucideBatteryCharging: LucideIcon;

// BatteryFull aliases
export declare const BatteryFullIcon: LucideIcon;
export declare const LucideBatteryFull: LucideIcon;

// BatteryLow aliases
export declare const BatteryLowIcon: LucideIcon;
export declare const LucideBatteryLow: LucideIcon;

// BatteryMedium aliases
export declare const BatteryMediumIcon: LucideIcon;
export declare const LucideBatteryMedium: LucideIcon;

// BatteryWarning aliases
export declare const BatteryWarningIcon: LucideIcon;
export declare const LucideBatteryWarning: LucideIcon;

// Battery aliases
export declare const BatteryIcon: LucideIcon;
export declare const LucideBattery: LucideIcon;

// Beaker aliases
export declare const BeakerIcon: LucideIcon;
export declare const LucideBeaker: LucideIcon;

// BeanOff aliases
export declare const BeanOffIcon: LucideIcon;
export declare const LucideBeanOff: LucideIcon;

// Bean aliases
export declare const BeanIcon: LucideIcon;
export declare const LucideBean: LucideIcon;

// BedDouble aliases
export declare const BedDoubleIcon: LucideIcon;
export declare const LucideBedDouble: LucideIcon;

// BedSingle aliases
export declare const BedSingleIcon: LucideIcon;
export declare const LucideBedSingle: LucideIcon;

// Bed aliases
export declare const BedIcon: LucideIcon;
export declare const LucideBed: LucideIcon;

// Beef aliases
export declare const BeefIcon: LucideIcon;
export declare const LucideBeef: LucideIcon;

// Beer aliases
export declare const BeerIcon: LucideIcon;
export declare const LucideBeer: LucideIcon;

// BellDot aliases
export declare const BellDotIcon: LucideIcon;
export declare const LucideBellDot: LucideIcon;

// BellElectric aliases
export declare const BellElectricIcon: LucideIcon;
export declare const LucideBellElectric: LucideIcon;

// BellMinus aliases
export declare const BellMinusIcon: LucideIcon;
export declare const LucideBellMinus: LucideIcon;

// BellOff aliases
export declare const BellOffIcon: LucideIcon;
export declare const LucideBellOff: LucideIcon;

// BellPlus aliases
export declare const BellPlusIcon: LucideIcon;
export declare const LucideBellPlus: LucideIcon;

// BellRing aliases
export declare const BellRingIcon: LucideIcon;
export declare const LucideBellRing: LucideIcon;

// Bell aliases
export declare const BellIcon: LucideIcon;
export declare const LucideBell: LucideIcon;

// Bike aliases
export declare const BikeIcon: LucideIcon;
export declare const LucideBike: LucideIcon;

// Binary aliases
export declare const BinaryIcon: LucideIcon;
export declare const LucideBinary: LucideIcon;

// Biohazard aliases
export declare const BiohazardIcon: LucideIcon;
export declare const LucideBiohazard: LucideIcon;

// Bird aliases
export declare const BirdIcon: LucideIcon;
export declare const LucideBird: LucideIcon;

// Bitcoin aliases
export declare const BitcoinIcon: LucideIcon;
export declare const LucideBitcoin: LucideIcon;

// Blinds aliases
export declare const BlindsIcon: LucideIcon;
export declare const LucideBlinds: LucideIcon;

// Blocks aliases
export declare const BlocksIcon: LucideIcon;
export declare const LucideBlocks: LucideIcon;

// BluetoothConnected aliases
export declare const BluetoothConnectedIcon: LucideIcon;
export declare const LucideBluetoothConnected: LucideIcon;

// BluetoothOff aliases
export declare const BluetoothOffIcon: LucideIcon;
export declare const LucideBluetoothOff: LucideIcon;

// BluetoothSearching aliases
export declare const BluetoothSearchingIcon: LucideIcon;
export declare const LucideBluetoothSearching: LucideIcon;

// Bluetooth aliases
export declare const BluetoothIcon: LucideIcon;
export declare const LucideBluetooth: LucideIcon;

// Bold aliases
export declare const BoldIcon: LucideIcon;
export declare const LucideBold: LucideIcon;

// Bomb aliases
export declare const BombIcon: LucideIcon;
export declare const LucideBomb: LucideIcon;

// Bone aliases
export declare const BoneIcon: LucideIcon;
export declare const LucideBone: LucideIcon;

// BookA aliases
export declare const BookAIcon: LucideIcon;
export declare const LucideBookA: LucideIcon;

// BookAudio aliases
export declare const BookAudioIcon: LucideIcon;
export declare const LucideBookAudio: LucideIcon;

// BookCheck aliases
export declare const BookCheckIcon: LucideIcon;
export declare const LucideBookCheck: LucideIcon;

// BookCopy aliases
export declare const BookCopyIcon: LucideIcon;
export declare const LucideBookCopy: LucideIcon;

// BookDashed aliases
export declare const BookDashedIcon: LucideIcon;
export declare const LucideBookDashed: LucideIcon;
export declare const BookTemplate: LucideIcon;

// BookDown aliases
export declare const BookDownIcon: LucideIcon;
export declare const LucideBookDown: LucideIcon;

// BookHeadphones aliases
export declare const BookHeadphonesIcon: LucideIcon;
export declare const LucideBookHeadphones: LucideIcon;

// BookHeart aliases
export declare const BookHeartIcon: LucideIcon;
export declare const LucideBookHeart: LucideIcon;

// BookImage aliases
export declare const BookImageIcon: LucideIcon;
export declare const LucideBookImage: LucideIcon;

// BookKey aliases
export declare const BookKeyIcon: LucideIcon;
export declare const LucideBookKey: LucideIcon;

// BookLock aliases
export declare const BookLockIcon: LucideIcon;
export declare const LucideBookLock: LucideIcon;

// BookMarked aliases
export declare const BookMarkedIcon: LucideIcon;
export declare const LucideBookMarked: LucideIcon;

// BookMinus aliases
export declare const BookMinusIcon: LucideIcon;
export declare const LucideBookMinus: LucideIcon;

// BookOpenCheck aliases
export declare const BookOpenCheckIcon: LucideIcon;
export declare const LucideBookOpenCheck: LucideIcon;

// BookOpenText aliases
export declare const BookOpenTextIcon: LucideIcon;
export declare const LucideBookOpenText: LucideIcon;

// BookOpen aliases
export declare const BookOpenIcon: LucideIcon;
export declare const LucideBookOpen: LucideIcon;

// BookPlus aliases
export declare const BookPlusIcon: LucideIcon;
export declare const LucideBookPlus: LucideIcon;

// BookText aliases
export declare const BookTextIcon: LucideIcon;
export declare const LucideBookText: LucideIcon;

// BookType aliases
export declare const BookTypeIcon: LucideIcon;
export declare const LucideBookType: LucideIcon;

// BookUp2 aliases
export declare const BookUp2Icon: LucideIcon;
export declare const LucideBookUp2: LucideIcon;

// BookUp aliases
export declare const BookUpIcon: LucideIcon;
export declare const LucideBookUp: LucideIcon;

// BookUser aliases
export declare const BookUserIcon: LucideIcon;
export declare const LucideBookUser: LucideIcon;

// BookX aliases
export declare const BookXIcon: LucideIcon;
export declare const LucideBookX: LucideIcon;

// Book aliases
export declare const BookIcon: LucideIcon;
export declare const LucideBook: LucideIcon;

// BookmarkCheck aliases
export declare const BookmarkCheckIcon: LucideIcon;
export declare const LucideBookmarkCheck: LucideIcon;

// BookmarkMinus aliases
export declare const BookmarkMinusIcon: LucideIcon;
export declare const LucideBookmarkMinus: LucideIcon;

// BookmarkPlus aliases
export declare const BookmarkPlusIcon: LucideIcon;
export declare const LucideBookmarkPlus: LucideIcon;

// BookmarkX aliases
export declare const BookmarkXIcon: LucideIcon;
export declare const LucideBookmarkX: LucideIcon;

// Bookmark aliases
export declare const BookmarkIcon: LucideIcon;
export declare const LucideBookmark: LucideIcon;

// BoomBox aliases
export declare const BoomBoxIcon: LucideIcon;
export declare const LucideBoomBox: LucideIcon;

// Bot aliases
export declare const BotIcon: LucideIcon;
export declare const LucideBot: LucideIcon;

// BoxSelect aliases
export declare const BoxSelectIcon: LucideIcon;
export declare const LucideBoxSelect: LucideIcon;

// Box aliases
export declare const BoxIcon: LucideIcon;
export declare const LucideBox: LucideIcon;

// Boxes aliases
export declare const BoxesIcon: LucideIcon;
export declare const LucideBoxes: LucideIcon;

// Braces aliases
export declare const BracesIcon: LucideIcon;
export declare const LucideBraces: LucideIcon;
export declare const CurlyBraces: LucideIcon;

// Brackets aliases
export declare const BracketsIcon: LucideIcon;
export declare const LucideBrackets: LucideIcon;

// BrainCircuit aliases
export declare const BrainCircuitIcon: LucideIcon;
export declare const LucideBrainCircuit: LucideIcon;

// BrainCog aliases
export declare const BrainCogIcon: LucideIcon;
export declare const LucideBrainCog: LucideIcon;

// Brain aliases
export declare const BrainIcon: LucideIcon;
export declare const LucideBrain: LucideIcon;

// BrickWall aliases
export declare const BrickWallIcon: LucideIcon;
export declare const LucideBrickWall: LucideIcon;

// Briefcase aliases
export declare const BriefcaseIcon: LucideIcon;
export declare const LucideBriefcase: LucideIcon;

// BringToFront aliases
export declare const BringToFrontIcon: LucideIcon;
export declare const LucideBringToFront: LucideIcon;

// Brush aliases
export declare const BrushIcon: LucideIcon;
export declare const LucideBrush: LucideIcon;

// BugOff aliases
export declare const BugOffIcon: LucideIcon;
export declare const LucideBugOff: LucideIcon;

// BugPlay aliases
export declare const BugPlayIcon: LucideIcon;
export declare const LucideBugPlay: LucideIcon;

// Bug aliases
export declare const BugIcon: LucideIcon;
export declare const LucideBug: LucideIcon;

// Building2 aliases
export declare const Building2Icon: LucideIcon;
export declare const LucideBuilding2: LucideIcon;

// Building aliases
export declare const BuildingIcon: LucideIcon;
export declare const LucideBuilding: LucideIcon;

// BusFront aliases
export declare const BusFrontIcon: LucideIcon;
export declare const LucideBusFront: LucideIcon;

// Bus aliases
export declare const BusIcon: LucideIcon;
export declare const LucideBus: LucideIcon;

// CableCar aliases
export declare const CableCarIcon: LucideIcon;
export declare const LucideCableCar: LucideIcon;

// Cable aliases
export declare const CableIcon: LucideIcon;
export declare const LucideCable: LucideIcon;

// CakeSlice aliases
export declare const CakeSliceIcon: LucideIcon;
export declare const LucideCakeSlice: LucideIcon;

// Cake aliases
export declare const CakeIcon: LucideIcon;
export declare const LucideCake: LucideIcon;

// Calculator aliases
export declare const CalculatorIcon: LucideIcon;
export declare const LucideCalculator: LucideIcon;

// CalendarCheck2 aliases
export declare const CalendarCheck2Icon: LucideIcon;
export declare const LucideCalendarCheck2: LucideIcon;

// CalendarCheck aliases
export declare const CalendarCheckIcon: LucideIcon;
export declare const LucideCalendarCheck: LucideIcon;

// CalendarClock aliases
export declare const CalendarClockIcon: LucideIcon;
export declare const LucideCalendarClock: LucideIcon;

// CalendarDays aliases
export declare const CalendarDaysIcon: LucideIcon;
export declare const LucideCalendarDays: LucideIcon;

// CalendarHeart aliases
export declare const CalendarHeartIcon: LucideIcon;
export declare const LucideCalendarHeart: LucideIcon;

// CalendarMinus aliases
export declare const CalendarMinusIcon: LucideIcon;
export declare const LucideCalendarMinus: LucideIcon;

// CalendarOff aliases
export declare const CalendarOffIcon: LucideIcon;
export declare const LucideCalendarOff: LucideIcon;

// CalendarPlus aliases
export declare const CalendarPlusIcon: LucideIcon;
export declare const LucideCalendarPlus: LucideIcon;

// CalendarRange aliases
export declare const CalendarRangeIcon: LucideIcon;
export declare const LucideCalendarRange: LucideIcon;

// CalendarSearch aliases
export declare const CalendarSearchIcon: LucideIcon;
export declare const LucideCalendarSearch: LucideIcon;

// CalendarX2 aliases
export declare const CalendarX2Icon: LucideIcon;
export declare const LucideCalendarX2: LucideIcon;

// CalendarX aliases
export declare const CalendarXIcon: LucideIcon;
export declare const LucideCalendarX: LucideIcon;

// Calendar aliases
export declare const CalendarIcon: LucideIcon;
export declare const LucideCalendar: LucideIcon;

// CameraOff aliases
export declare const CameraOffIcon: LucideIcon;
export declare const LucideCameraOff: LucideIcon;

// Camera aliases
export declare const CameraIcon: LucideIcon;
export declare const LucideCamera: LucideIcon;

// CandlestickChart aliases
export declare const CandlestickChartIcon: LucideIcon;
export declare const LucideCandlestickChart: LucideIcon;

// CandyCane aliases
export declare const CandyCaneIcon: LucideIcon;
export declare const LucideCandyCane: LucideIcon;

// CandyOff aliases
export declare const CandyOffIcon: LucideIcon;
export declare const LucideCandyOff: LucideIcon;

// Candy aliases
export declare const CandyIcon: LucideIcon;
export declare const LucideCandy: LucideIcon;

// CarFront aliases
export declare const CarFrontIcon: LucideIcon;
export declare const LucideCarFront: LucideIcon;

// CarTaxiFront aliases
export declare const CarTaxiFrontIcon: LucideIcon;
export declare const LucideCarTaxiFront: LucideIcon;

// Car aliases
export declare const CarIcon: LucideIcon;
export declare const LucideCar: LucideIcon;

// Caravan aliases
export declare const CaravanIcon: LucideIcon;
export declare const LucideCaravan: LucideIcon;

// Carrot aliases
export declare const CarrotIcon: LucideIcon;
export declare const LucideCarrot: LucideIcon;

// CaseLower aliases
export declare const CaseLowerIcon: LucideIcon;
export declare const LucideCaseLower: LucideIcon;

// CaseSensitive aliases
export declare const CaseSensitiveIcon: LucideIcon;
export declare const LucideCaseSensitive: LucideIcon;

// CaseUpper aliases
export declare const CaseUpperIcon: LucideIcon;
export declare const LucideCaseUpper: LucideIcon;

// CassetteTape aliases
export declare const CassetteTapeIcon: LucideIcon;
export declare const LucideCassetteTape: LucideIcon;

// Cast aliases
export declare const CastIcon: LucideIcon;
export declare const LucideCast: LucideIcon;

// Castle aliases
export declare const CastleIcon: LucideIcon;
export declare const LucideCastle: LucideIcon;

// Cat aliases
export declare const CatIcon: LucideIcon;
export declare const LucideCat: LucideIcon;

// Cctv aliases
export declare const CctvIcon: LucideIcon;
export declare const LucideCctv: LucideIcon;

// CheckCheck aliases
export declare const CheckCheckIcon: LucideIcon;
export declare const LucideCheckCheck: LucideIcon;

// CheckCircle2 aliases
export declare const CheckCircle2Icon: LucideIcon;
export declare const LucideCheckCircle2: LucideIcon;

// CheckCircle aliases
export declare const CheckCircleIcon: LucideIcon;
export declare const LucideCheckCircle: LucideIcon;

// CheckSquare2 aliases
export declare const CheckSquare2Icon: LucideIcon;
export declare const LucideCheckSquare2: LucideIcon;

// CheckSquare aliases
export declare const CheckSquareIcon: LucideIcon;
export declare const LucideCheckSquare: LucideIcon;

// Check aliases
export declare const CheckIcon: LucideIcon;
export declare const LucideCheck: LucideIcon;

// ChefHat aliases
export declare const ChefHatIcon: LucideIcon;
export declare const LucideChefHat: LucideIcon;

// Cherry aliases
export declare const CherryIcon: LucideIcon;
export declare const LucideCherry: LucideIcon;

// ChevronDownCircle aliases
export declare const ChevronDownCircleIcon: LucideIcon;
export declare const LucideChevronDownCircle: LucideIcon;

// ChevronDownSquare aliases
export declare const ChevronDownSquareIcon: LucideIcon;
export declare const LucideChevronDownSquare: LucideIcon;

// ChevronDown aliases
export declare const ChevronDownIcon: LucideIcon;
export declare const LucideChevronDown: LucideIcon;

// ChevronFirst aliases
export declare const ChevronFirstIcon: LucideIcon;
export declare const LucideChevronFirst: LucideIcon;

// ChevronLast aliases
export declare const ChevronLastIcon: LucideIcon;
export declare const LucideChevronLast: LucideIcon;

// ChevronLeftCircle aliases
export declare const ChevronLeftCircleIcon: LucideIcon;
export declare const LucideChevronLeftCircle: LucideIcon;

// ChevronLeftSquare aliases
export declare const ChevronLeftSquareIcon: LucideIcon;
export declare const LucideChevronLeftSquare: LucideIcon;

// ChevronLeft aliases
export declare const ChevronLeftIcon: LucideIcon;
export declare const LucideChevronLeft: LucideIcon;

// ChevronRightCircle aliases
export declare const ChevronRightCircleIcon: LucideIcon;
export declare const LucideChevronRightCircle: LucideIcon;

// ChevronRightSquare aliases
export declare const ChevronRightSquareIcon: LucideIcon;
export declare const LucideChevronRightSquare: LucideIcon;

// ChevronRight aliases
export declare const ChevronRightIcon: LucideIcon;
export declare const LucideChevronRight: LucideIcon;

// ChevronUpCircle aliases
export declare const ChevronUpCircleIcon: LucideIcon;
export declare const LucideChevronUpCircle: LucideIcon;

// ChevronUpSquare aliases
export declare const ChevronUpSquareIcon: LucideIcon;
export declare const LucideChevronUpSquare: LucideIcon;

// ChevronUp aliases
export declare const ChevronUpIcon: LucideIcon;
export declare const LucideChevronUp: LucideIcon;

// ChevronsDownUp aliases
export declare const ChevronsDownUpIcon: LucideIcon;
export declare const LucideChevronsDownUp: LucideIcon;

// ChevronsDown aliases
export declare const ChevronsDownIcon: LucideIcon;
export declare const LucideChevronsDown: LucideIcon;

// ChevronsLeftRight aliases
export declare const ChevronsLeftRightIcon: LucideIcon;
export declare const LucideChevronsLeftRight: LucideIcon;

// ChevronsLeft aliases
export declare const ChevronsLeftIcon: LucideIcon;
export declare const LucideChevronsLeft: LucideIcon;

// ChevronsRightLeft aliases
export declare const ChevronsRightLeftIcon: LucideIcon;
export declare const LucideChevronsRightLeft: LucideIcon;

// ChevronsRight aliases
export declare const ChevronsRightIcon: LucideIcon;
export declare const LucideChevronsRight: LucideIcon;

// ChevronsUpDown aliases
export declare const ChevronsUpDownIcon: LucideIcon;
export declare const LucideChevronsUpDown: LucideIcon;

// ChevronsUp aliases
export declare const ChevronsUpIcon: LucideIcon;
export declare const LucideChevronsUp: LucideIcon;

// Chrome aliases
export declare const ChromeIcon: LucideIcon;
export declare const LucideChrome: LucideIcon;

// Church aliases
export declare const ChurchIcon: LucideIcon;
export declare const LucideChurch: LucideIcon;

// CigaretteOff aliases
export declare const CigaretteOffIcon: LucideIcon;
export declare const LucideCigaretteOff: LucideIcon;

// Cigarette aliases
export declare const CigaretteIcon: LucideIcon;
export declare const LucideCigarette: LucideIcon;

// CircleDashed aliases
export declare const CircleDashedIcon: LucideIcon;
export declare const LucideCircleDashed: LucideIcon;

// CircleDollarSign aliases
export declare const CircleDollarSignIcon: LucideIcon;
export declare const LucideCircleDollarSign: LucideIcon;

// CircleDotDashed aliases
export declare const CircleDotDashedIcon: LucideIcon;
export declare const LucideCircleDotDashed: LucideIcon;

// CircleDot aliases
export declare const CircleDotIcon: LucideIcon;
export declare const LucideCircleDot: LucideIcon;

// CircleEllipsis aliases
export declare const CircleEllipsisIcon: LucideIcon;
export declare const LucideCircleEllipsis: LucideIcon;

// CircleEqual aliases
export declare const CircleEqualIcon: LucideIcon;
export declare const LucideCircleEqual: LucideIcon;

// CircleOff aliases
export declare const CircleOffIcon: LucideIcon;
export declare const LucideCircleOff: LucideIcon;

// CircleSlash2 aliases
export declare const CircleSlash2Icon: LucideIcon;
export declare const LucideCircleSlash2: LucideIcon;
export declare const CircleSlashed: LucideIcon;

// CircleSlash aliases
export declare const CircleSlashIcon: LucideIcon;
export declare const LucideCircleSlash: LucideIcon;

// CircleUserRound aliases
export declare const CircleUserRoundIcon: LucideIcon;
export declare const LucideCircleUserRound: LucideIcon;
export declare const UserCircle2: LucideIcon;

// CircleUser aliases
export declare const CircleUserIcon: LucideIcon;
export declare const LucideCircleUser: LucideIcon;
export declare const UserCircle: LucideIcon;

// Circle aliases
export declare const CircleIcon: LucideIcon;
export declare const LucideCircle: LucideIcon;

// CircuitBoard aliases
export declare const CircuitBoardIcon: LucideIcon;
export declare const LucideCircuitBoard: LucideIcon;

// Citrus aliases
export declare const CitrusIcon: LucideIcon;
export declare const LucideCitrus: LucideIcon;

// Clapperboard aliases
export declare const ClapperboardIcon: LucideIcon;
export declare const LucideClapperboard: LucideIcon;

// ClipboardCheck aliases
export declare const ClipboardCheckIcon: LucideIcon;
export declare const LucideClipboardCheck: LucideIcon;

// ClipboardCopy aliases
export declare const ClipboardCopyIcon: LucideIcon;
export declare const LucideClipboardCopy: LucideIcon;

// ClipboardEdit aliases
export declare const ClipboardEditIcon: LucideIcon;
export declare const LucideClipboardEdit: LucideIcon;

// ClipboardList aliases
export declare const ClipboardListIcon: LucideIcon;
export declare const LucideClipboardList: LucideIcon;

// ClipboardPaste aliases
export declare const ClipboardPasteIcon: LucideIcon;
export declare const LucideClipboardPaste: LucideIcon;

// ClipboardSignature aliases
export declare const ClipboardSignatureIcon: LucideIcon;
export declare const LucideClipboardSignature: LucideIcon;

// ClipboardType aliases
export declare const ClipboardTypeIcon: LucideIcon;
export declare const LucideClipboardType: LucideIcon;

// ClipboardX aliases
export declare const ClipboardXIcon: LucideIcon;
export declare const LucideClipboardX: LucideIcon;

// Clipboard aliases
export declare const ClipboardIcon: LucideIcon;
export declare const LucideClipboard: LucideIcon;

// Clock1 aliases
export declare const Clock1Icon: LucideIcon;
export declare const LucideClock1: LucideIcon;

// Clock10 aliases
export declare const Clock10Icon: LucideIcon;
export declare const LucideClock10: LucideIcon;

// Clock11 aliases
export declare const Clock11Icon: LucideIcon;
export declare const LucideClock11: LucideIcon;

// Clock12 aliases
export declare const Clock12Icon: LucideIcon;
export declare const LucideClock12: LucideIcon;

// Clock2 aliases
export declare const Clock2Icon: LucideIcon;
export declare const LucideClock2: LucideIcon;

// Clock3 aliases
export declare const Clock3Icon: LucideIcon;
export declare const LucideClock3: LucideIcon;

// Clock4 aliases
export declare const Clock4Icon: LucideIcon;
export declare const LucideClock4: LucideIcon;

// Clock5 aliases
export declare const Clock5Icon: LucideIcon;
export declare const LucideClock5: LucideIcon;

// Clock6 aliases
export declare const Clock6Icon: LucideIcon;
export declare const LucideClock6: LucideIcon;

// Clock7 aliases
export declare const Clock7Icon: LucideIcon;
export declare const LucideClock7: LucideIcon;

// Clock8 aliases
export declare const Clock8Icon: LucideIcon;
export declare const LucideClock8: LucideIcon;

// Clock9 aliases
export declare const Clock9Icon: LucideIcon;
export declare const LucideClock9: LucideIcon;

// Clock aliases
export declare const ClockIcon: LucideIcon;
export declare const LucideClock: LucideIcon;

// CloudCog aliases
export declare const CloudCogIcon: LucideIcon;
export declare const LucideCloudCog: LucideIcon;

// CloudDrizzle aliases
export declare const CloudDrizzleIcon: LucideIcon;
export declare const LucideCloudDrizzle: LucideIcon;

// CloudFog aliases
export declare const CloudFogIcon: LucideIcon;
export declare const LucideCloudFog: LucideIcon;

// CloudHail aliases
export declare const CloudHailIcon: LucideIcon;
export declare const LucideCloudHail: LucideIcon;

// CloudLightning aliases
export declare const CloudLightningIcon: LucideIcon;
export declare const LucideCloudLightning: LucideIcon;

// CloudMoonRain aliases
export declare const CloudMoonRainIcon: LucideIcon;
export declare const LucideCloudMoonRain: LucideIcon;

// CloudMoon aliases
export declare const CloudMoonIcon: LucideIcon;
export declare const LucideCloudMoon: LucideIcon;

// CloudOff aliases
export declare const CloudOffIcon: LucideIcon;
export declare const LucideCloudOff: LucideIcon;

// CloudRainWind aliases
export declare const CloudRainWindIcon: LucideIcon;
export declare const LucideCloudRainWind: LucideIcon;

// CloudRain aliases
export declare const CloudRainIcon: LucideIcon;
export declare const LucideCloudRain: LucideIcon;

// CloudSnow aliases
export declare const CloudSnowIcon: LucideIcon;
export declare const LucideCloudSnow: LucideIcon;

// CloudSunRain aliases
export declare const CloudSunRainIcon: LucideIcon;
export declare const LucideCloudSunRain: LucideIcon;

// CloudSun aliases
export declare const CloudSunIcon: LucideIcon;
export declare const LucideCloudSun: LucideIcon;

// Cloud aliases
export declare const CloudIcon: LucideIcon;
export declare const LucideCloud: LucideIcon;

// Cloudy aliases
export declare const CloudyIcon: LucideIcon;
export declare const LucideCloudy: LucideIcon;

// Clover aliases
export declare const CloverIcon: LucideIcon;
export declare const LucideClover: LucideIcon;

// Club aliases
export declare const ClubIcon: LucideIcon;
export declare const LucideClub: LucideIcon;

// Code2 aliases
export declare const Code2Icon: LucideIcon;
export declare const LucideCode2: LucideIcon;

// Code aliases
export declare const CodeIcon: LucideIcon;
export declare const LucideCode: LucideIcon;

// Codepen aliases
export declare const CodepenIcon: LucideIcon;
export declare const LucideCodepen: LucideIcon;

// Codesandbox aliases
export declare const CodesandboxIcon: LucideIcon;
export declare const LucideCodesandbox: LucideIcon;

// Coffee aliases
export declare const CoffeeIcon: LucideIcon;
export declare const LucideCoffee: LucideIcon;

// Cog aliases
export declare const CogIcon: LucideIcon;
export declare const LucideCog: LucideIcon;

// Coins aliases
export declare const CoinsIcon: LucideIcon;
export declare const LucideCoins: LucideIcon;

// Columns2 aliases
export declare const Columns2Icon: LucideIcon;
export declare const LucideColumns2: LucideIcon;
export declare const Columns: LucideIcon;

// Columns3 aliases
export declare const Columns3Icon: LucideIcon;
export declare const LucideColumns3: LucideIcon;
export declare const PanelsLeftRight: LucideIcon;

// Columns4 aliases
export declare const Columns4Icon: LucideIcon;
export declare const LucideColumns4: LucideIcon;

// Combine aliases
export declare const CombineIcon: LucideIcon;
export declare const LucideCombine: LucideIcon;

// Command aliases
export declare const CommandIcon: LucideIcon;
export declare const LucideCommand: LucideIcon;

// Compass aliases
export declare const CompassIcon: LucideIcon;
export declare const LucideCompass: LucideIcon;

// Component aliases
export declare const ComponentIcon: LucideIcon;
export declare const LucideComponent: LucideIcon;

// Computer aliases
export declare const ComputerIcon: LucideIcon;
export declare const LucideComputer: LucideIcon;

// ConciergeBell aliases
export declare const ConciergeBellIcon: LucideIcon;
export declare const LucideConciergeBell: LucideIcon;

// Cone aliases
export declare const ConeIcon: LucideIcon;
export declare const LucideCone: LucideIcon;

// Construction aliases
export declare const ConstructionIcon: LucideIcon;
export declare const LucideConstruction: LucideIcon;

// Contact2 aliases
export declare const Contact2Icon: LucideIcon;
export declare const LucideContact2: LucideIcon;

// Contact aliases
export declare const ContactIcon: LucideIcon;
export declare const LucideContact: LucideIcon;

// Container aliases
export declare const ContainerIcon: LucideIcon;
export declare const LucideContainer: LucideIcon;

// Contrast aliases
export declare const ContrastIcon: LucideIcon;
export declare const LucideContrast: LucideIcon;

// Cookie aliases
export declare const CookieIcon: LucideIcon;
export declare const LucideCookie: LucideIcon;

// CookingPot aliases
export declare const CookingPotIcon: LucideIcon;
export declare const LucideCookingPot: LucideIcon;

// CopyCheck aliases
export declare const CopyCheckIcon: LucideIcon;
export declare const LucideCopyCheck: LucideIcon;

// CopyMinus aliases
export declare const CopyMinusIcon: LucideIcon;
export declare const LucideCopyMinus: LucideIcon;

// CopyPlus aliases
export declare const CopyPlusIcon: LucideIcon;
export declare const LucideCopyPlus: LucideIcon;

// CopySlash aliases
export declare const CopySlashIcon: LucideIcon;
export declare const LucideCopySlash: LucideIcon;

// CopyX aliases
export declare const CopyXIcon: LucideIcon;
export declare const LucideCopyX: LucideIcon;

// Copy aliases
export declare const CopyIcon: LucideIcon;
export declare const LucideCopy: LucideIcon;

// Copyleft aliases
export declare const CopyleftIcon: LucideIcon;
export declare const LucideCopyleft: LucideIcon;

// Copyright aliases
export declare const CopyrightIcon: LucideIcon;
export declare const LucideCopyright: LucideIcon;

// CornerDownLeft aliases
export declare const CornerDownLeftIcon: LucideIcon;
export declare const LucideCornerDownLeft: LucideIcon;

// CornerDownRight aliases
export declare const CornerDownRightIcon: LucideIcon;
export declare const LucideCornerDownRight: LucideIcon;

// CornerLeftDown aliases
export declare const CornerLeftDownIcon: LucideIcon;
export declare const LucideCornerLeftDown: LucideIcon;

// CornerLeftUp aliases
export declare const CornerLeftUpIcon: LucideIcon;
export declare const LucideCornerLeftUp: LucideIcon;

// CornerRightDown aliases
export declare const CornerRightDownIcon: LucideIcon;
export declare const LucideCornerRightDown: LucideIcon;

// CornerRightUp aliases
export declare const CornerRightUpIcon: LucideIcon;
export declare const LucideCornerRightUp: LucideIcon;

// CornerUpLeft aliases
export declare const CornerUpLeftIcon: LucideIcon;
export declare const LucideCornerUpLeft: LucideIcon;

// CornerUpRight aliases
export declare const CornerUpRightIcon: LucideIcon;
export declare const LucideCornerUpRight: LucideIcon;

// Cpu aliases
export declare const CpuIcon: LucideIcon;
export declare const LucideCpu: LucideIcon;

// CreativeCommons aliases
export declare const CreativeCommonsIcon: LucideIcon;
export declare const LucideCreativeCommons: LucideIcon;

// CreditCard aliases
export declare const CreditCardIcon: LucideIcon;
export declare const LucideCreditCard: LucideIcon;

// Croissant aliases
export declare const CroissantIcon: LucideIcon;
export declare const LucideCroissant: LucideIcon;

// Crop aliases
export declare const CropIcon: LucideIcon;
export declare const LucideCrop: LucideIcon;

// Cross aliases
export declare const CrossIcon: LucideIcon;
export declare const LucideCross: LucideIcon;

// Crosshair aliases
export declare const CrosshairIcon: LucideIcon;
export declare const LucideCrosshair: LucideIcon;

// Crown aliases
export declare const CrownIcon: LucideIcon;
export declare const LucideCrown: LucideIcon;

// Cuboid aliases
export declare const CuboidIcon: LucideIcon;
export declare const LucideCuboid: LucideIcon;

// CupSoda aliases
export declare const CupSodaIcon: LucideIcon;
export declare const LucideCupSoda: LucideIcon;

// Currency aliases
export declare const CurrencyIcon: LucideIcon;
export declare const LucideCurrency: LucideIcon;

// Cylinder aliases
export declare const CylinderIcon: LucideIcon;
export declare const LucideCylinder: LucideIcon;

// DatabaseBackup aliases
export declare const DatabaseBackupIcon: LucideIcon;
export declare const LucideDatabaseBackup: LucideIcon;

// DatabaseZap aliases
export declare const DatabaseZapIcon: LucideIcon;
export declare const LucideDatabaseZap: LucideIcon;

// Database aliases
export declare const DatabaseIcon: LucideIcon;
export declare const LucideDatabase: LucideIcon;

// Delete aliases
export declare const DeleteIcon: LucideIcon;
export declare const LucideDelete: LucideIcon;

// Dessert aliases
export declare const DessertIcon: LucideIcon;
export declare const LucideDessert: LucideIcon;

// Diameter aliases
export declare const DiameterIcon: LucideIcon;
export declare const LucideDiameter: LucideIcon;

// Diamond aliases
export declare const DiamondIcon: LucideIcon;
export declare const LucideDiamond: LucideIcon;

// Dice1 aliases
export declare const Dice1Icon: LucideIcon;
export declare const LucideDice1: LucideIcon;

// Dice2 aliases
export declare const Dice2Icon: LucideIcon;
export declare const LucideDice2: LucideIcon;

// Dice3 aliases
export declare const Dice3Icon: LucideIcon;
export declare const LucideDice3: LucideIcon;

// Dice4 aliases
export declare const Dice4Icon: LucideIcon;
export declare const LucideDice4: LucideIcon;

// Dice5 aliases
export declare const Dice5Icon: LucideIcon;
export declare const LucideDice5: LucideIcon;

// Dice6 aliases
export declare const Dice6Icon: LucideIcon;
export declare const LucideDice6: LucideIcon;

// Dices aliases
export declare const DicesIcon: LucideIcon;
export declare const LucideDices: LucideIcon;

// Diff aliases
export declare const DiffIcon: LucideIcon;
export declare const LucideDiff: LucideIcon;

// Disc2 aliases
export declare const Disc2Icon: LucideIcon;
export declare const LucideDisc2: LucideIcon;

// Disc3 aliases
export declare const Disc3Icon: LucideIcon;
export declare const LucideDisc3: LucideIcon;

// DiscAlbum aliases
export declare const DiscAlbumIcon: LucideIcon;
export declare const LucideDiscAlbum: LucideIcon;

// Disc aliases
export declare const DiscIcon: LucideIcon;
export declare const LucideDisc: LucideIcon;

// DivideCircle aliases
export declare const DivideCircleIcon: LucideIcon;
export declare const LucideDivideCircle: LucideIcon;

// DivideSquare aliases
export declare const DivideSquareIcon: LucideIcon;
export declare const LucideDivideSquare: LucideIcon;

// Divide aliases
export declare const DivideIcon: LucideIcon;
export declare const LucideDivide: LucideIcon;

// DnaOff aliases
export declare const DnaOffIcon: LucideIcon;
export declare const LucideDnaOff: LucideIcon;

// Dna aliases
export declare const DnaIcon: LucideIcon;
export declare const LucideDna: LucideIcon;

// Dog aliases
export declare const DogIcon: LucideIcon;
export declare const LucideDog: LucideIcon;

// DollarSign aliases
export declare const DollarSignIcon: LucideIcon;
export declare const LucideDollarSign: LucideIcon;

// Donut aliases
export declare const DonutIcon: LucideIcon;
export declare const LucideDonut: LucideIcon;

// DoorClosed aliases
export declare const DoorClosedIcon: LucideIcon;
export declare const LucideDoorClosed: LucideIcon;

// DoorOpen aliases
export declare const DoorOpenIcon: LucideIcon;
export declare const LucideDoorOpen: LucideIcon;

// Dot aliases
export declare const DotIcon: LucideIcon;
export declare const LucideDot: LucideIcon;

// DownloadCloud aliases
export declare const DownloadCloudIcon: LucideIcon;
export declare const LucideDownloadCloud: LucideIcon;

// Download aliases
export declare const DownloadIcon: LucideIcon;
export declare const LucideDownload: LucideIcon;

// DraftingCompass aliases
export declare const DraftingCompassIcon: LucideIcon;
export declare const LucideDraftingCompass: LucideIcon;

// Drama aliases
export declare const DramaIcon: LucideIcon;
export declare const LucideDrama: LucideIcon;

// Dribbble aliases
export declare const DribbbleIcon: LucideIcon;
export declare const LucideDribbble: LucideIcon;

// Droplet aliases
export declare const DropletIcon: LucideIcon;
export declare const LucideDroplet: LucideIcon;

// Droplets aliases
export declare const DropletsIcon: LucideIcon;
export declare const LucideDroplets: LucideIcon;

// Drum aliases
export declare const DrumIcon: LucideIcon;
export declare const LucideDrum: LucideIcon;

// Drumstick aliases
export declare const DrumstickIcon: LucideIcon;
export declare const LucideDrumstick: LucideIcon;

// Dumbbell aliases
export declare const DumbbellIcon: LucideIcon;
export declare const LucideDumbbell: LucideIcon;

// EarOff aliases
export declare const EarOffIcon: LucideIcon;
export declare const LucideEarOff: LucideIcon;

// Ear aliases
export declare const EarIcon: LucideIcon;
export declare const LucideEar: LucideIcon;

// EggFried aliases
export declare const EggFriedIcon: LucideIcon;
export declare const LucideEggFried: LucideIcon;

// EggOff aliases
export declare const EggOffIcon: LucideIcon;
export declare const LucideEggOff: LucideIcon;

// Egg aliases
export declare const EggIcon: LucideIcon;
export declare const LucideEgg: LucideIcon;

// EqualNot aliases
export declare const EqualNotIcon: LucideIcon;
export declare const LucideEqualNot: LucideIcon;

// Equal aliases
export declare const EqualIcon: LucideIcon;
export declare const LucideEqual: LucideIcon;

// Eraser aliases
export declare const EraserIcon: LucideIcon;
export declare const LucideEraser: LucideIcon;

// Euro aliases
export declare const EuroIcon: LucideIcon;
export declare const LucideEuro: LucideIcon;

// Expand aliases
export declare const ExpandIcon: LucideIcon;
export declare const LucideExpand: LucideIcon;

// ExternalLink aliases
export declare const ExternalLinkIcon: LucideIcon;
export declare const LucideExternalLink: LucideIcon;

// EyeOff aliases
export declare const EyeOffIcon: LucideIcon;
export declare const LucideEyeOff: LucideIcon;

// Eye aliases
export declare const EyeIcon: LucideIcon;
export declare const LucideEye: LucideIcon;

// Facebook aliases
export declare const FacebookIcon: LucideIcon;
export declare const LucideFacebook: LucideIcon;

// Factory aliases
export declare const FactoryIcon: LucideIcon;
export declare const LucideFactory: LucideIcon;

// Fan aliases
export declare const FanIcon: LucideIcon;
export declare const LucideFan: LucideIcon;

// FastForward aliases
export declare const FastForwardIcon: LucideIcon;
export declare const LucideFastForward: LucideIcon;

// Feather aliases
export declare const FeatherIcon: LucideIcon;
export declare const LucideFeather: LucideIcon;

// Fence aliases
export declare const FenceIcon: LucideIcon;
export declare const LucideFence: LucideIcon;

// FerrisWheel aliases
export declare const FerrisWheelIcon: LucideIcon;
export declare const LucideFerrisWheel: LucideIcon;

// Figma aliases
export declare const FigmaIcon: LucideIcon;
export declare const LucideFigma: LucideIcon;

// FileArchive aliases
export declare const FileArchiveIcon: LucideIcon;
export declare const LucideFileArchive: LucideIcon;

// FileAudio2 aliases
export declare const FileAudio2Icon: LucideIcon;
export declare const LucideFileAudio2: LucideIcon;

// FileAudio aliases
export declare const FileAudioIcon: LucideIcon;
export declare const LucideFileAudio: LucideIcon;

// FileAxis3d aliases
export declare const FileAxis3dIcon: LucideIcon;
export declare const LucideFileAxis3d: LucideIcon;
export declare const FileAxis3D: LucideIcon;

// FileBadge2 aliases
export declare const FileBadge2Icon: LucideIcon;
export declare const LucideFileBadge2: LucideIcon;

// FileBadge aliases
export declare const FileBadgeIcon: LucideIcon;
export declare const LucideFileBadge: LucideIcon;

// FileBarChart2 aliases
export declare const FileBarChart2Icon: LucideIcon;
export declare const LucideFileBarChart2: LucideIcon;

// FileBarChart aliases
export declare const FileBarChartIcon: LucideIcon;
export declare const LucideFileBarChart: LucideIcon;

// FileBox aliases
export declare const FileBoxIcon: LucideIcon;
export declare const LucideFileBox: LucideIcon;

// FileCheck2 aliases
export declare const FileCheck2Icon: LucideIcon;
export declare const LucideFileCheck2: LucideIcon;

// FileCheck aliases
export declare const FileCheckIcon: LucideIcon;
export declare const LucideFileCheck: LucideIcon;

// FileClock aliases
export declare const FileClockIcon: LucideIcon;
export declare const LucideFileClock: LucideIcon;

// FileCode2 aliases
export declare const FileCode2Icon: LucideIcon;
export declare const LucideFileCode2: LucideIcon;

// FileCode aliases
export declare const FileCodeIcon: LucideIcon;
export declare const LucideFileCode: LucideIcon;

// FileCog aliases
export declare const FileCogIcon: LucideIcon;
export declare const LucideFileCog: LucideIcon;
export declare const FileCog2: LucideIcon;

// FileDiff aliases
export declare const FileDiffIcon: LucideIcon;
export declare const LucideFileDiff: LucideIcon;

// FileDigit aliases
export declare const FileDigitIcon: LucideIcon;
export declare const LucideFileDigit: LucideIcon;

// FileDown aliases
export declare const FileDownIcon: LucideIcon;
export declare const LucideFileDown: LucideIcon;

// FileEdit aliases
export declare const FileEditIcon: LucideIcon;
export declare const LucideFileEdit: LucideIcon;

// FileHeart aliases
export declare const FileHeartIcon: LucideIcon;
export declare const LucideFileHeart: LucideIcon;

// FileImage aliases
export declare const FileImageIcon: LucideIcon;
export declare const LucideFileImage: LucideIcon;

// FileInput aliases
export declare const FileInputIcon: LucideIcon;
export declare const LucideFileInput: LucideIcon;

// FileJson2 aliases
export declare const FileJson2Icon: LucideIcon;
export declare const LucideFileJson2: LucideIcon;

// FileJson aliases
export declare const FileJsonIcon: LucideIcon;
export declare const LucideFileJson: LucideIcon;

// FileKey2 aliases
export declare const FileKey2Icon: LucideIcon;
export declare const LucideFileKey2: LucideIcon;

// FileKey aliases
export declare const FileKeyIcon: LucideIcon;
export declare const LucideFileKey: LucideIcon;

// FileLineChart aliases
export declare const FileLineChartIcon: LucideIcon;
export declare const LucideFileLineChart: LucideIcon;

// FileLock2 aliases
export declare const FileLock2Icon: LucideIcon;
export declare const LucideFileLock2: LucideIcon;

// FileLock aliases
export declare const FileLockIcon: LucideIcon;
export declare const LucideFileLock: LucideIcon;

// FileMinus2 aliases
export declare const FileMinus2Icon: LucideIcon;
export declare const LucideFileMinus2: LucideIcon;

// FileMinus aliases
export declare const FileMinusIcon: LucideIcon;
export declare const LucideFileMinus: LucideIcon;

// FileMusic aliases
export declare const FileMusicIcon: LucideIcon;
export declare const LucideFileMusic: LucideIcon;

// FileOutput aliases
export declare const FileOutputIcon: LucideIcon;
export declare const LucideFileOutput: LucideIcon;

// FilePieChart aliases
export declare const FilePieChartIcon: LucideIcon;
export declare const LucideFilePieChart: LucideIcon;

// FilePlus2 aliases
export declare const FilePlus2Icon: LucideIcon;
export declare const LucideFilePlus2: LucideIcon;

// FilePlus aliases
export declare const FilePlusIcon: LucideIcon;
export declare const LucideFilePlus: LucideIcon;

// FileQuestion aliases
export declare const FileQuestionIcon: LucideIcon;
export declare const LucideFileQuestion: LucideIcon;

// FileScan aliases
export declare const FileScanIcon: LucideIcon;
export declare const LucideFileScan: LucideIcon;

// FileSearch2 aliases
export declare const FileSearch2Icon: LucideIcon;
export declare const LucideFileSearch2: LucideIcon;

// FileSearch aliases
export declare const FileSearchIcon: LucideIcon;
export declare const LucideFileSearch: LucideIcon;

// FileSignature aliases
export declare const FileSignatureIcon: LucideIcon;
export declare const LucideFileSignature: LucideIcon;

// FileSpreadsheet aliases
export declare const FileSpreadsheetIcon: LucideIcon;
export declare const LucideFileSpreadsheet: LucideIcon;

// FileStack aliases
export declare const FileStackIcon: LucideIcon;
export declare const LucideFileStack: LucideIcon;

// FileSymlink aliases
export declare const FileSymlinkIcon: LucideIcon;
export declare const LucideFileSymlink: LucideIcon;

// FileTerminal aliases
export declare const FileTerminalIcon: LucideIcon;
export declare const LucideFileTerminal: LucideIcon;

// FileText aliases
export declare const FileTextIcon: LucideIcon;
export declare const LucideFileText: LucideIcon;

// FileType2 aliases
export declare const FileType2Icon: LucideIcon;
export declare const LucideFileType2: LucideIcon;

// FileType aliases
export declare const FileTypeIcon: LucideIcon;
export declare const LucideFileType: LucideIcon;

// FileUp aliases
export declare const FileUpIcon: LucideIcon;
export declare const LucideFileUp: LucideIcon;

// FileVideo2 aliases
export declare const FileVideo2Icon: LucideIcon;
export declare const LucideFileVideo2: LucideIcon;

// FileVideo aliases
export declare const FileVideoIcon: LucideIcon;
export declare const LucideFileVideo: LucideIcon;

// FileVolume2 aliases
export declare const FileVolume2Icon: LucideIcon;
export declare const LucideFileVolume2: LucideIcon;

// FileVolume aliases
export declare const FileVolumeIcon: LucideIcon;
export declare const LucideFileVolume: LucideIcon;

// FileWarning aliases
export declare const FileWarningIcon: LucideIcon;
export declare const LucideFileWarning: LucideIcon;

// FileX2 aliases
export declare const FileX2Icon: LucideIcon;
export declare const LucideFileX2: LucideIcon;

// FileX aliases
export declare const FileXIcon: LucideIcon;
export declare const LucideFileX: LucideIcon;

// File aliases
export declare const FileIcon: LucideIcon;
export declare const LucideFile: LucideIcon;

// Files aliases
export declare const FilesIcon: LucideIcon;
export declare const LucideFiles: LucideIcon;

// Film aliases
export declare const FilmIcon: LucideIcon;
export declare const LucideFilm: LucideIcon;

// FilterX aliases
export declare const FilterXIcon: LucideIcon;
export declare const LucideFilterX: LucideIcon;

// Filter aliases
export declare const FilterIcon: LucideIcon;
export declare const LucideFilter: LucideIcon;

// Fingerprint aliases
export declare const FingerprintIcon: LucideIcon;
export declare const LucideFingerprint: LucideIcon;

// FireExtinguisher aliases
export declare const FireExtinguisherIcon: LucideIcon;
export declare const LucideFireExtinguisher: LucideIcon;

// FishOff aliases
export declare const FishOffIcon: LucideIcon;
export declare const LucideFishOff: LucideIcon;

// FishSymbol aliases
export declare const FishSymbolIcon: LucideIcon;
export declare const LucideFishSymbol: LucideIcon;

// Fish aliases
export declare const FishIcon: LucideIcon;
export declare const LucideFish: LucideIcon;

// FlagOff aliases
export declare const FlagOffIcon: LucideIcon;
export declare const LucideFlagOff: LucideIcon;

// FlagTriangleLeft aliases
export declare const FlagTriangleLeftIcon: LucideIcon;
export declare const LucideFlagTriangleLeft: LucideIcon;

// FlagTriangleRight aliases
export declare const FlagTriangleRightIcon: LucideIcon;
export declare const LucideFlagTriangleRight: LucideIcon;

// Flag aliases
export declare const FlagIcon: LucideIcon;
export declare const LucideFlag: LucideIcon;

// FlameKindling aliases
export declare const FlameKindlingIcon: LucideIcon;
export declare const LucideFlameKindling: LucideIcon;

// Flame aliases
export declare const FlameIcon: LucideIcon;
export declare const LucideFlame: LucideIcon;

// FlashlightOff aliases
export declare const FlashlightOffIcon: LucideIcon;
export declare const LucideFlashlightOff: LucideIcon;

// Flashlight aliases
export declare const FlashlightIcon: LucideIcon;
export declare const LucideFlashlight: LucideIcon;

// FlaskConicalOff aliases
export declare const FlaskConicalOffIcon: LucideIcon;
export declare const LucideFlaskConicalOff: LucideIcon;

// FlaskConical aliases
export declare const FlaskConicalIcon: LucideIcon;
export declare const LucideFlaskConical: LucideIcon;

// FlaskRound aliases
export declare const FlaskRoundIcon: LucideIcon;
export declare const LucideFlaskRound: LucideIcon;

// FlipHorizontal2 aliases
export declare const FlipHorizontal2Icon: LucideIcon;
export declare const LucideFlipHorizontal2: LucideIcon;

// FlipHorizontal aliases
export declare const FlipHorizontalIcon: LucideIcon;
export declare const LucideFlipHorizontal: LucideIcon;

// FlipVertical2 aliases
export declare const FlipVertical2Icon: LucideIcon;
export declare const LucideFlipVertical2: LucideIcon;

// FlipVertical aliases
export declare const FlipVerticalIcon: LucideIcon;
export declare const LucideFlipVertical: LucideIcon;

// Flower2 aliases
export declare const Flower2Icon: LucideIcon;
export declare const LucideFlower2: LucideIcon;

// Flower aliases
export declare const FlowerIcon: LucideIcon;
export declare const LucideFlower: LucideIcon;

// Focus aliases
export declare const FocusIcon: LucideIcon;
export declare const LucideFocus: LucideIcon;

// FoldHorizontal aliases
export declare const FoldHorizontalIcon: LucideIcon;
export declare const LucideFoldHorizontal: LucideIcon;

// FoldVertical aliases
export declare const FoldVerticalIcon: LucideIcon;
export declare const LucideFoldVertical: LucideIcon;

// FolderArchive aliases
export declare const FolderArchiveIcon: LucideIcon;
export declare const LucideFolderArchive: LucideIcon;

// FolderCheck aliases
export declare const FolderCheckIcon: LucideIcon;
export declare const LucideFolderCheck: LucideIcon;

// FolderClock aliases
export declare const FolderClockIcon: LucideIcon;
export declare const LucideFolderClock: LucideIcon;

// FolderClosed aliases
export declare const FolderClosedIcon: LucideIcon;
export declare const LucideFolderClosed: LucideIcon;

// FolderCog aliases
export declare const FolderCogIcon: LucideIcon;
export declare const LucideFolderCog: LucideIcon;
export declare const FolderCog2: LucideIcon;

// FolderDot aliases
export declare const FolderDotIcon: LucideIcon;
export declare const LucideFolderDot: LucideIcon;

// FolderDown aliases
export declare const FolderDownIcon: LucideIcon;
export declare const LucideFolderDown: LucideIcon;

// FolderEdit aliases
export declare const FolderEditIcon: LucideIcon;
export declare const LucideFolderEdit: LucideIcon;

// FolderGit2 aliases
export declare const FolderGit2Icon: LucideIcon;
export declare const LucideFolderGit2: LucideIcon;

// FolderGit aliases
export declare const FolderGitIcon: LucideIcon;
export declare const LucideFolderGit: LucideIcon;

// FolderHeart aliases
export declare const FolderHeartIcon: LucideIcon;
export declare const LucideFolderHeart: LucideIcon;

// FolderInput aliases
export declare const FolderInputIcon: LucideIcon;
export declare const LucideFolderInput: LucideIcon;

// FolderKanban aliases
export declare const FolderKanbanIcon: LucideIcon;
export declare const LucideFolderKanban: LucideIcon;

// FolderKey aliases
export declare const FolderKeyIcon: LucideIcon;
export declare const LucideFolderKey: LucideIcon;

// FolderLock aliases
export declare const FolderLockIcon: LucideIcon;
export declare const LucideFolderLock: LucideIcon;

// FolderMinus aliases
export declare const FolderMinusIcon: LucideIcon;
export declare const LucideFolderMinus: LucideIcon;

// FolderOpenDot aliases
export declare const FolderOpenDotIcon: LucideIcon;
export declare const LucideFolderOpenDot: LucideIcon;

// FolderOpen aliases
export declare const FolderOpenIcon: LucideIcon;
export declare const LucideFolderOpen: LucideIcon;

// FolderOutput aliases
export declare const FolderOutputIcon: LucideIcon;
export declare const LucideFolderOutput: LucideIcon;

// FolderPlus aliases
export declare const FolderPlusIcon: LucideIcon;
export declare const LucideFolderPlus: LucideIcon;

// FolderRoot aliases
export declare const FolderRootIcon: LucideIcon;
export declare const LucideFolderRoot: LucideIcon;

// FolderSearch2 aliases
export declare const FolderSearch2Icon: LucideIcon;
export declare const LucideFolderSearch2: LucideIcon;

// FolderSearch aliases
export declare const FolderSearchIcon: LucideIcon;
export declare const LucideFolderSearch: LucideIcon;

// FolderSymlink aliases
export declare const FolderSymlinkIcon: LucideIcon;
export declare const LucideFolderSymlink: LucideIcon;

// FolderSync aliases
export declare const FolderSyncIcon: LucideIcon;
export declare const LucideFolderSync: LucideIcon;

// FolderTree aliases
export declare const FolderTreeIcon: LucideIcon;
export declare const LucideFolderTree: LucideIcon;

// FolderUp aliases
export declare const FolderUpIcon: LucideIcon;
export declare const LucideFolderUp: LucideIcon;

// FolderX aliases
export declare const FolderXIcon: LucideIcon;
export declare const LucideFolderX: LucideIcon;

// Folder aliases
export declare const FolderIcon: LucideIcon;
export declare const LucideFolder: LucideIcon;

// Folders aliases
export declare const FoldersIcon: LucideIcon;
export declare const LucideFolders: LucideIcon;

// Footprints aliases
export declare const FootprintsIcon: LucideIcon;
export declare const LucideFootprints: LucideIcon;

// Forklift aliases
export declare const ForkliftIcon: LucideIcon;
export declare const LucideForklift: LucideIcon;

// FormInput aliases
export declare const FormInputIcon: LucideIcon;
export declare const LucideFormInput: LucideIcon;

// Forward aliases
export declare const ForwardIcon: LucideIcon;
export declare const LucideForward: LucideIcon;

// Frame aliases
export declare const FrameIcon: LucideIcon;
export declare const LucideFrame: LucideIcon;

// Framer aliases
export declare const FramerIcon: LucideIcon;
export declare const LucideFramer: LucideIcon;

// Frown aliases
export declare const FrownIcon: LucideIcon;
export declare const LucideFrown: LucideIcon;

// Fuel aliases
export declare const FuelIcon: LucideIcon;
export declare const LucideFuel: LucideIcon;

// Fullscreen aliases
export declare const FullscreenIcon: LucideIcon;
export declare const LucideFullscreen: LucideIcon;

// FunctionSquare aliases
export declare const FunctionSquareIcon: LucideIcon;
export declare const LucideFunctionSquare: LucideIcon;

// GalleryHorizontalEnd aliases
export declare const GalleryHorizontalEndIcon: LucideIcon;
export declare const LucideGalleryHorizontalEnd: LucideIcon;

// GalleryHorizontal aliases
export declare const GalleryHorizontalIcon: LucideIcon;
export declare const LucideGalleryHorizontal: LucideIcon;

// GalleryThumbnails aliases
export declare const GalleryThumbnailsIcon: LucideIcon;
export declare const LucideGalleryThumbnails: LucideIcon;

// GalleryVerticalEnd aliases
export declare const GalleryVerticalEndIcon: LucideIcon;
export declare const LucideGalleryVerticalEnd: LucideIcon;

// GalleryVertical aliases
export declare const GalleryVerticalIcon: LucideIcon;
export declare const LucideGalleryVertical: LucideIcon;

// Gamepad2 aliases
export declare const Gamepad2Icon: LucideIcon;
export declare const LucideGamepad2: LucideIcon;

// Gamepad aliases
export declare const GamepadIcon: LucideIcon;
export declare const LucideGamepad: LucideIcon;

// GanttChartSquare aliases
export declare const GanttChartSquareIcon: LucideIcon;
export declare const LucideGanttChartSquare: LucideIcon;
export declare const SquareGantt: LucideIcon;

// GanttChart aliases
export declare const GanttChartIcon: LucideIcon;
export declare const LucideGanttChart: LucideIcon;

// GaugeCircle aliases
export declare const GaugeCircleIcon: LucideIcon;
export declare const LucideGaugeCircle: LucideIcon;

// Gauge aliases
export declare const GaugeIcon: LucideIcon;
export declare const LucideGauge: LucideIcon;

// Gavel aliases
export declare const GavelIcon: LucideIcon;
export declare const LucideGavel: LucideIcon;

// Gem aliases
export declare const GemIcon: LucideIcon;
export declare const LucideGem: LucideIcon;

// Ghost aliases
export declare const GhostIcon: LucideIcon;
export declare const LucideGhost: LucideIcon;

// Gift aliases
export declare const GiftIcon: LucideIcon;
export declare const LucideGift: LucideIcon;

// GitBranchPlus aliases
export declare const GitBranchPlusIcon: LucideIcon;
export declare const LucideGitBranchPlus: LucideIcon;

// GitBranch aliases
export declare const GitBranchIcon: LucideIcon;
export declare const LucideGitBranch: LucideIcon;

// GitCommitHorizontal aliases
export declare const GitCommitHorizontalIcon: LucideIcon;
export declare const LucideGitCommitHorizontal: LucideIcon;
export declare const GitCommit: LucideIcon;

// GitCommitVertical aliases
export declare const GitCommitVerticalIcon: LucideIcon;
export declare const LucideGitCommitVertical: LucideIcon;

// GitCompareArrows aliases
export declare const GitCompareArrowsIcon: LucideIcon;
export declare const LucideGitCompareArrows: LucideIcon;

// GitCompare aliases
export declare const GitCompareIcon: LucideIcon;
export declare const LucideGitCompare: LucideIcon;

// GitFork aliases
export declare const GitForkIcon: LucideIcon;
export declare const LucideGitFork: LucideIcon;

// GitGraph aliases
export declare const GitGraphIcon: LucideIcon;
export declare const LucideGitGraph: LucideIcon;

// GitMerge aliases
export declare const GitMergeIcon: LucideIcon;
export declare const LucideGitMerge: LucideIcon;

// GitPullRequestArrow aliases
export declare const GitPullRequestArrowIcon: LucideIcon;
export declare const LucideGitPullRequestArrow: LucideIcon;

// GitPullRequestClosed aliases
export declare const GitPullRequestClosedIcon: LucideIcon;
export declare const LucideGitPullRequestClosed: LucideIcon;

// GitPullRequestCreateArrow aliases
export declare const GitPullRequestCreateArrowIcon: LucideIcon;
export declare const LucideGitPullRequestCreateArrow: LucideIcon;

// GitPullRequestCreate aliases
export declare const GitPullRequestCreateIcon: LucideIcon;
export declare const LucideGitPullRequestCreate: LucideIcon;

// GitPullRequestDraft aliases
export declare const GitPullRequestDraftIcon: LucideIcon;
export declare const LucideGitPullRequestDraft: LucideIcon;

// GitPullRequest aliases
export declare const GitPullRequestIcon: LucideIcon;
export declare const LucideGitPullRequest: LucideIcon;

// Github aliases
export declare const GithubIcon: LucideIcon;
export declare const LucideGithub: LucideIcon;

// Gitlab aliases
export declare const GitlabIcon: LucideIcon;
export declare const LucideGitlab: LucideIcon;

// GlassWater aliases
export declare const GlassWaterIcon: LucideIcon;
export declare const LucideGlassWater: LucideIcon;

// Glasses aliases
export declare const GlassesIcon: LucideIcon;
export declare const LucideGlasses: LucideIcon;

// Globe2 aliases
export declare const Globe2Icon: LucideIcon;
export declare const LucideGlobe2: LucideIcon;

// Globe aliases
export declare const GlobeIcon: LucideIcon;
export declare const LucideGlobe: LucideIcon;

// Goal aliases
export declare const GoalIcon: LucideIcon;
export declare const LucideGoal: LucideIcon;

// Grab aliases
export declare const GrabIcon: LucideIcon;
export declare const LucideGrab: LucideIcon;

// GraduationCap aliases
export declare const GraduationCapIcon: LucideIcon;
export declare const LucideGraduationCap: LucideIcon;

// Grape aliases
export declare const GrapeIcon: LucideIcon;
export declare const LucideGrape: LucideIcon;

// Grid2x2 aliases
export declare const Grid2x2Icon: LucideIcon;
export declare const LucideGrid2x2: LucideIcon;
export declare const Grid2X2: LucideIcon;

// Grid3x3 aliases
export declare const Grid3x3Icon: LucideIcon;
export declare const LucideGrid3x3: LucideIcon;
export declare const Grid: LucideIcon;
export declare const Grid3X3: LucideIcon;

// GripHorizontal aliases
export declare const GripHorizontalIcon: LucideIcon;
export declare const LucideGripHorizontal: LucideIcon;

// GripVertical aliases
export declare const GripVerticalIcon: LucideIcon;
export declare const LucideGripVertical: LucideIcon;

// Grip aliases
export declare const GripIcon: LucideIcon;
export declare const LucideGrip: LucideIcon;

// Group aliases
export declare const GroupIcon: LucideIcon;
export declare const LucideGroup: LucideIcon;

// Guitar aliases
export declare const GuitarIcon: LucideIcon;
export declare const LucideGuitar: LucideIcon;

// Hammer aliases
export declare const HammerIcon: LucideIcon;
export declare const LucideHammer: LucideIcon;

// HandMetal aliases
export declare const HandMetalIcon: LucideIcon;
export declare const LucideHandMetal: LucideIcon;

// Hand aliases
export declare const HandIcon: LucideIcon;
export declare const LucideHand: LucideIcon;

// HardDriveDownload aliases
export declare const HardDriveDownloadIcon: LucideIcon;
export declare const LucideHardDriveDownload: LucideIcon;

// HardDriveUpload aliases
export declare const HardDriveUploadIcon: LucideIcon;
export declare const LucideHardDriveUpload: LucideIcon;

// HardDrive aliases
export declare const HardDriveIcon: LucideIcon;
export declare const LucideHardDrive: LucideIcon;

// HardHat aliases
export declare const HardHatIcon: LucideIcon;
export declare const LucideHardHat: LucideIcon;

// Hash aliases
export declare const HashIcon: LucideIcon;
export declare const LucideHash: LucideIcon;

// Haze aliases
export declare const HazeIcon: LucideIcon;
export declare const LucideHaze: LucideIcon;

// HdmiPort aliases
export declare const HdmiPortIcon: LucideIcon;
export declare const LucideHdmiPort: LucideIcon;

// Heading1 aliases
export declare const Heading1Icon: LucideIcon;
export declare const LucideHeading1: LucideIcon;

// Heading2 aliases
export declare const Heading2Icon: LucideIcon;
export declare const LucideHeading2: LucideIcon;

// Heading3 aliases
export declare const Heading3Icon: LucideIcon;
export declare const LucideHeading3: LucideIcon;

// Heading4 aliases
export declare const Heading4Icon: LucideIcon;
export declare const LucideHeading4: LucideIcon;

// Heading5 aliases
export declare const Heading5Icon: LucideIcon;
export declare const LucideHeading5: LucideIcon;

// Heading6 aliases
export declare const Heading6Icon: LucideIcon;
export declare const LucideHeading6: LucideIcon;

// Heading aliases
export declare const HeadingIcon: LucideIcon;
export declare const LucideHeading: LucideIcon;

// Headphones aliases
export declare const HeadphonesIcon: LucideIcon;
export declare const LucideHeadphones: LucideIcon;

// HeartCrack aliases
export declare const HeartCrackIcon: LucideIcon;
export declare const LucideHeartCrack: LucideIcon;

// HeartHandshake aliases
export declare const HeartHandshakeIcon: LucideIcon;
export declare const LucideHeartHandshake: LucideIcon;

// HeartOff aliases
export declare const HeartOffIcon: LucideIcon;
export declare const LucideHeartOff: LucideIcon;

// HeartPulse aliases
export declare const HeartPulseIcon: LucideIcon;
export declare const LucideHeartPulse: LucideIcon;

// Heart aliases
export declare const HeartIcon: LucideIcon;
export declare const LucideHeart: LucideIcon;

// HelpCircle aliases
export declare const HelpCircleIcon: LucideIcon;
export declare const LucideHelpCircle: LucideIcon;

// HelpingHand aliases
export declare const HelpingHandIcon: LucideIcon;
export declare const LucideHelpingHand: LucideIcon;

// Hexagon aliases
export declare const HexagonIcon: LucideIcon;
export declare const LucideHexagon: LucideIcon;

// Highlighter aliases
export declare const HighlighterIcon: LucideIcon;
export declare const LucideHighlighter: LucideIcon;

// History aliases
export declare const HistoryIcon: LucideIcon;
export declare const LucideHistory: LucideIcon;

// Home aliases
export declare const HomeIcon: LucideIcon;
export declare const LucideHome: LucideIcon;

// HopOff aliases
export declare const HopOffIcon: LucideIcon;
export declare const LucideHopOff: LucideIcon;

// Hop aliases
export declare const HopIcon: LucideIcon;
export declare const LucideHop: LucideIcon;

// Hotel aliases
export declare const HotelIcon: LucideIcon;
export declare const LucideHotel: LucideIcon;

// Hourglass aliases
export declare const HourglassIcon: LucideIcon;
export declare const LucideHourglass: LucideIcon;

// IceCream2 aliases
export declare const IceCream2Icon: LucideIcon;
export declare const LucideIceCream2: LucideIcon;

// IceCream aliases
export declare const IceCreamIcon: LucideIcon;
export declare const LucideIceCream: LucideIcon;

// ImageDown aliases
export declare const ImageDownIcon: LucideIcon;
export declare const LucideImageDown: LucideIcon;

// ImageMinus aliases
export declare const ImageMinusIcon: LucideIcon;
export declare const LucideImageMinus: LucideIcon;

// ImageOff aliases
export declare const ImageOffIcon: LucideIcon;
export declare const LucideImageOff: LucideIcon;

// ImagePlus aliases
export declare const ImagePlusIcon: LucideIcon;
export declare const LucideImagePlus: LucideIcon;

// Image aliases
export declare const ImageIcon: LucideIcon;
export declare const LucideImage: LucideIcon;

// Import aliases
export declare const ImportIcon: LucideIcon;
export declare const LucideImport: LucideIcon;

// Inbox aliases
export declare const InboxIcon: LucideIcon;
export declare const LucideInbox: LucideIcon;

// Indent aliases
export declare const IndentIcon: LucideIcon;
export declare const LucideIndent: LucideIcon;

// IndianRupee aliases
export declare const IndianRupeeIcon: LucideIcon;
export declare const LucideIndianRupee: LucideIcon;

// Infinity aliases
export declare const InfinityIcon: LucideIcon;
export declare const LucideInfinity: LucideIcon;

// Info aliases
export declare const InfoIcon: LucideIcon;
export declare const LucideInfo: LucideIcon;

// InspectionPanel aliases
export declare const InspectionPanelIcon: LucideIcon;
export declare const LucideInspectionPanel: LucideIcon;

// Instagram aliases
export declare const InstagramIcon: LucideIcon;
export declare const LucideInstagram: LucideIcon;

// Italic aliases
export declare const ItalicIcon: LucideIcon;
export declare const LucideItalic: LucideIcon;

// IterationCcw aliases
export declare const IterationCcwIcon: LucideIcon;
export declare const LucideIterationCcw: LucideIcon;

// IterationCw aliases
export declare const IterationCwIcon: LucideIcon;
export declare const LucideIterationCw: LucideIcon;

// JapaneseYen aliases
export declare const JapaneseYenIcon: LucideIcon;
export declare const LucideJapaneseYen: LucideIcon;

// Joystick aliases
export declare const JoystickIcon: LucideIcon;
export declare const LucideJoystick: LucideIcon;

// KanbanSquareDashed aliases
export declare const KanbanSquareDashedIcon: LucideIcon;
export declare const LucideKanbanSquareDashed: LucideIcon;
export declare const SquareKanbanDashed: LucideIcon;

// KanbanSquare aliases
export declare const KanbanSquareIcon: LucideIcon;
export declare const LucideKanbanSquare: LucideIcon;
export declare const SquareKanban: LucideIcon;

// Kanban aliases
export declare const KanbanIcon: LucideIcon;
export declare const LucideKanban: LucideIcon;

// KeyRound aliases
export declare const KeyRoundIcon: LucideIcon;
export declare const LucideKeyRound: LucideIcon;

// KeySquare aliases
export declare const KeySquareIcon: LucideIcon;
export declare const LucideKeySquare: LucideIcon;

// Key aliases
export declare const KeyIcon: LucideIcon;
export declare const LucideKey: LucideIcon;

// KeyboardMusic aliases
export declare const KeyboardMusicIcon: LucideIcon;
export declare const LucideKeyboardMusic: LucideIcon;

// Keyboard aliases
export declare const KeyboardIcon: LucideIcon;
export declare const LucideKeyboard: LucideIcon;

// LampCeiling aliases
export declare const LampCeilingIcon: LucideIcon;
export declare const LucideLampCeiling: LucideIcon;

// LampDesk aliases
export declare const LampDeskIcon: LucideIcon;
export declare const LucideLampDesk: LucideIcon;

// LampFloor aliases
export declare const LampFloorIcon: LucideIcon;
export declare const LucideLampFloor: LucideIcon;

// LampWallDown aliases
export declare const LampWallDownIcon: LucideIcon;
export declare const LucideLampWallDown: LucideIcon;

// LampWallUp aliases
export declare const LampWallUpIcon: LucideIcon;
export declare const LucideLampWallUp: LucideIcon;

// Lamp aliases
export declare const LampIcon: LucideIcon;
export declare const LucideLamp: LucideIcon;

// LandPlot aliases
export declare const LandPlotIcon: LucideIcon;
export declare const LucideLandPlot: LucideIcon;

// Landmark aliases
export declare const LandmarkIcon: LucideIcon;
export declare const LucideLandmark: LucideIcon;

// Languages aliases
export declare const LanguagesIcon: LucideIcon;
export declare const LucideLanguages: LucideIcon;

// Laptop2 aliases
export declare const Laptop2Icon: LucideIcon;
export declare const LucideLaptop2: LucideIcon;

// Laptop aliases
export declare const LaptopIcon: LucideIcon;
export declare const LucideLaptop: LucideIcon;

// LassoSelect aliases
export declare const LassoSelectIcon: LucideIcon;
export declare const LucideLassoSelect: LucideIcon;

// Lasso aliases
export declare const LassoIcon: LucideIcon;
export declare const LucideLasso: LucideIcon;

// Laugh aliases
export declare const LaughIcon: LucideIcon;
export declare const LucideLaugh: LucideIcon;

// Layers2 aliases
export declare const Layers2Icon: LucideIcon;
export declare const LucideLayers2: LucideIcon;

// Layers3 aliases
export declare const Layers3Icon: LucideIcon;
export declare const LucideLayers3: LucideIcon;

// Layers aliases
export declare const LayersIcon: LucideIcon;
export declare const LucideLayers: LucideIcon;

// LayoutDashboard aliases
export declare const LayoutDashboardIcon: LucideIcon;
export declare const LucideLayoutDashboard: LucideIcon;

// LayoutGrid aliases
export declare const LayoutGridIcon: LucideIcon;
export declare const LucideLayoutGrid: LucideIcon;

// LayoutList aliases
export declare const LayoutListIcon: LucideIcon;
export declare const LucideLayoutList: LucideIcon;

// LayoutPanelLeft aliases
export declare const LayoutPanelLeftIcon: LucideIcon;
export declare const LucideLayoutPanelLeft: LucideIcon;

// LayoutPanelTop aliases
export declare const LayoutPanelTopIcon: LucideIcon;
export declare const LucideLayoutPanelTop: LucideIcon;

// LayoutTemplate aliases
export declare const LayoutTemplateIcon: LucideIcon;
export declare const LucideLayoutTemplate: LucideIcon;

// Leaf aliases
export declare const LeafIcon: LucideIcon;
export declare const LucideLeaf: LucideIcon;

// LeafyGreen aliases
export declare const LeafyGreenIcon: LucideIcon;
export declare const LucideLeafyGreen: LucideIcon;

// LibraryBig aliases
export declare const LibraryBigIcon: LucideIcon;
export declare const LucideLibraryBig: LucideIcon;

// LibrarySquare aliases
export declare const LibrarySquareIcon: LucideIcon;
export declare const LucideLibrarySquare: LucideIcon;

// Library aliases
export declare const LibraryIcon: LucideIcon;
export declare const LucideLibrary: LucideIcon;

// LifeBuoy aliases
export declare const LifeBuoyIcon: LucideIcon;
export declare const LucideLifeBuoy: LucideIcon;

// Ligature aliases
export declare const LigatureIcon: LucideIcon;
export declare const LucideLigature: LucideIcon;

// LightbulbOff aliases
export declare const LightbulbOffIcon: LucideIcon;
export declare const LucideLightbulbOff: LucideIcon;

// Lightbulb aliases
export declare const LightbulbIcon: LucideIcon;
export declare const LucideLightbulb: LucideIcon;

// LineChart aliases
export declare const LineChartIcon: LucideIcon;
export declare const LucideLineChart: LucideIcon;

// Link2Off aliases
export declare const Link2OffIcon: LucideIcon;
export declare const LucideLink2Off: LucideIcon;

// Link2 aliases
export declare const Link2Icon: LucideIcon;
export declare const LucideLink2: LucideIcon;

// Link aliases
export declare const LinkIcon: LucideIcon;
export declare const LucideLink: LucideIcon;

// Linkedin aliases
export declare const LinkedinIcon: LucideIcon;
export declare const LucideLinkedin: LucideIcon;

// ListChecks aliases
export declare const ListChecksIcon: LucideIcon;
export declare const LucideListChecks: LucideIcon;

// ListEnd aliases
export declare const ListEndIcon: LucideIcon;
export declare const LucideListEnd: LucideIcon;

// ListFilter aliases
export declare const ListFilterIcon: LucideIcon;
export declare const LucideListFilter: LucideIcon;

// ListMinus aliases
export declare const ListMinusIcon: LucideIcon;
export declare const LucideListMinus: LucideIcon;

// ListMusic aliases
export declare const ListMusicIcon: LucideIcon;
export declare const LucideListMusic: LucideIcon;

// ListOrdered aliases
export declare const ListOrderedIcon: LucideIcon;
export declare const LucideListOrdered: LucideIcon;

// ListPlus aliases
export declare const ListPlusIcon: LucideIcon;
export declare const LucideListPlus: LucideIcon;

// ListRestart aliases
export declare const ListRestartIcon: LucideIcon;
export declare const LucideListRestart: LucideIcon;

// ListStart aliases
export declare const ListStartIcon: LucideIcon;
export declare const LucideListStart: LucideIcon;

// ListTodo aliases
export declare const ListTodoIcon: LucideIcon;
export declare const LucideListTodo: LucideIcon;

// ListTree aliases
export declare const ListTreeIcon: LucideIcon;
export declare const LucideListTree: LucideIcon;

// ListVideo aliases
export declare const ListVideoIcon: LucideIcon;
export declare const LucideListVideo: LucideIcon;

// ListX aliases
export declare const ListXIcon: LucideIcon;
export declare const LucideListX: LucideIcon;

// List aliases
export declare const ListIcon: LucideIcon;
export declare const LucideList: LucideIcon;

// Loader2 aliases
export declare const Loader2Icon: LucideIcon;
export declare const LucideLoader2: LucideIcon;

// Loader aliases
export declare const LoaderIcon: LucideIcon;
export declare const LucideLoader: LucideIcon;

// LocateFixed aliases
export declare const LocateFixedIcon: LucideIcon;
export declare const LucideLocateFixed: LucideIcon;

// LocateOff aliases
export declare const LocateOffIcon: LucideIcon;
export declare const LucideLocateOff: LucideIcon;

// Locate aliases
export declare const LocateIcon: LucideIcon;
export declare const LucideLocate: LucideIcon;

// LockKeyhole aliases
export declare const LockKeyholeIcon: LucideIcon;
export declare const LucideLockKeyhole: LucideIcon;

// Lock aliases
export declare const LockIcon: LucideIcon;
export declare const LucideLock: LucideIcon;

// LogIn aliases
export declare const LogInIcon: LucideIcon;
export declare const LucideLogIn: LucideIcon;

// LogOut aliases
export declare const LogOutIcon: LucideIcon;
export declare const LucideLogOut: LucideIcon;

// Lollipop aliases
export declare const LollipopIcon: LucideIcon;
export declare const LucideLollipop: LucideIcon;

// Luggage aliases
export declare const LuggageIcon: LucideIcon;
export declare const LucideLuggage: LucideIcon;

// MSquare aliases
export declare const MSquareIcon: LucideIcon;
export declare const LucideMSquare: LucideIcon;

// Magnet aliases
export declare const MagnetIcon: LucideIcon;
export declare const LucideMagnet: LucideIcon;

// MailCheck aliases
export declare const MailCheckIcon: LucideIcon;
export declare const LucideMailCheck: LucideIcon;

// MailMinus aliases
export declare const MailMinusIcon: LucideIcon;
export declare const LucideMailMinus: LucideIcon;

// MailOpen aliases
export declare const MailOpenIcon: LucideIcon;
export declare const LucideMailOpen: LucideIcon;

// MailPlus aliases
export declare const MailPlusIcon: LucideIcon;
export declare const LucideMailPlus: LucideIcon;

// MailQuestion aliases
export declare const MailQuestionIcon: LucideIcon;
export declare const LucideMailQuestion: LucideIcon;

// MailSearch aliases
export declare const MailSearchIcon: LucideIcon;
export declare const LucideMailSearch: LucideIcon;

// MailWarning aliases
export declare const MailWarningIcon: LucideIcon;
export declare const LucideMailWarning: LucideIcon;

// MailX aliases
export declare const MailXIcon: LucideIcon;
export declare const LucideMailX: LucideIcon;

// Mail aliases
export declare const MailIcon: LucideIcon;
export declare const LucideMail: LucideIcon;

// Mailbox aliases
export declare const MailboxIcon: LucideIcon;
export declare const LucideMailbox: LucideIcon;

// Mails aliases
export declare const MailsIcon: LucideIcon;
export declare const LucideMails: LucideIcon;

// MapPinOff aliases
export declare const MapPinOffIcon: LucideIcon;
export declare const LucideMapPinOff: LucideIcon;

// MapPin aliases
export declare const MapPinIcon: LucideIcon;
export declare const LucideMapPin: LucideIcon;

// MapPinned aliases
export declare const MapPinnedIcon: LucideIcon;
export declare const LucideMapPinned: LucideIcon;

// Map aliases
export declare const MapIcon: LucideIcon;
export declare const LucideMap: LucideIcon;

// Martini aliases
export declare const MartiniIcon: LucideIcon;
export declare const LucideMartini: LucideIcon;

// Maximize2 aliases
export declare const Maximize2Icon: LucideIcon;
export declare const LucideMaximize2: LucideIcon;

// Maximize aliases
export declare const MaximizeIcon: LucideIcon;
export declare const LucideMaximize: LucideIcon;

// Medal aliases
export declare const MedalIcon: LucideIcon;
export declare const LucideMedal: LucideIcon;

// MegaphoneOff aliases
export declare const MegaphoneOffIcon: LucideIcon;
export declare const LucideMegaphoneOff: LucideIcon;

// Megaphone aliases
export declare const MegaphoneIcon: LucideIcon;
export declare const LucideMegaphone: LucideIcon;

// Meh aliases
export declare const MehIcon: LucideIcon;
export declare const LucideMeh: LucideIcon;

// MemoryStick aliases
export declare const MemoryStickIcon: LucideIcon;
export declare const LucideMemoryStick: LucideIcon;

// MenuSquare aliases
export declare const MenuSquareIcon: LucideIcon;
export declare const LucideMenuSquare: LucideIcon;

// Menu aliases
export declare const MenuIcon: LucideIcon;
export declare const LucideMenu: LucideIcon;

// Merge aliases
export declare const MergeIcon: LucideIcon;
export declare const LucideMerge: LucideIcon;

// MessageCircleCode aliases
export declare const MessageCircleCodeIcon: LucideIcon;
export declare const LucideMessageCircleCode: LucideIcon;

// MessageCircleDashed aliases
export declare const MessageCircleDashedIcon: LucideIcon;
export declare const LucideMessageCircleDashed: LucideIcon;

// MessageCircleHeart aliases
export declare const MessageCircleHeartIcon: LucideIcon;
export declare const LucideMessageCircleHeart: LucideIcon;

// MessageCircleMore aliases
export declare const MessageCircleMoreIcon: LucideIcon;
export declare const LucideMessageCircleMore: LucideIcon;

// MessageCircleOff aliases
export declare const MessageCircleOffIcon: LucideIcon;
export declare const LucideMessageCircleOff: LucideIcon;

// MessageCirclePlus aliases
export declare const MessageCirclePlusIcon: LucideIcon;
export declare const LucideMessageCirclePlus: LucideIcon;

// MessageCircleQuestion aliases
export declare const MessageCircleQuestionIcon: LucideIcon;
export declare const LucideMessageCircleQuestion: LucideIcon;

// MessageCircleReply aliases
export declare const MessageCircleReplyIcon: LucideIcon;
export declare const LucideMessageCircleReply: LucideIcon;

// MessageCircleWarning aliases
export declare const MessageCircleWarningIcon: LucideIcon;
export declare const LucideMessageCircleWarning: LucideIcon;

// MessageCircleX aliases
export declare const MessageCircleXIcon: LucideIcon;
export declare const LucideMessageCircleX: LucideIcon;

// MessageCircle aliases
export declare const MessageCircleIcon: LucideIcon;
export declare const LucideMessageCircle: LucideIcon;

// MessageSquareCode aliases
export declare const MessageSquareCodeIcon: LucideIcon;
export declare const LucideMessageSquareCode: LucideIcon;

// MessageSquareDashed aliases
export declare const MessageSquareDashedIcon: LucideIcon;
export declare const LucideMessageSquareDashed: LucideIcon;

// MessageSquareDiff aliases
export declare const MessageSquareDiffIcon: LucideIcon;
export declare const LucideMessageSquareDiff: LucideIcon;

// MessageSquareDot aliases
export declare const MessageSquareDotIcon: LucideIcon;
export declare const LucideMessageSquareDot: LucideIcon;

// MessageSquareHeart aliases
export declare const MessageSquareHeartIcon: LucideIcon;
export declare const LucideMessageSquareHeart: LucideIcon;

// MessageSquareMore aliases
export declare const MessageSquareMoreIcon: LucideIcon;
export declare const LucideMessageSquareMore: LucideIcon;

// MessageSquareOff aliases
export declare const MessageSquareOffIcon: LucideIcon;
export declare const LucideMessageSquareOff: LucideIcon;

// MessageSquarePlus aliases
export declare const MessageSquarePlusIcon: LucideIcon;
export declare const LucideMessageSquarePlus: LucideIcon;

// MessageSquareQuote aliases
export declare const MessageSquareQuoteIcon: LucideIcon;
export declare const LucideMessageSquareQuote: LucideIcon;

// MessageSquareReply aliases
export declare const MessageSquareReplyIcon: LucideIcon;
export declare const LucideMessageSquareReply: LucideIcon;

// MessageSquareShare aliases
export declare const MessageSquareShareIcon: LucideIcon;
export declare const LucideMessageSquareShare: LucideIcon;

// MessageSquareText aliases
export declare const MessageSquareTextIcon: LucideIcon;
export declare const LucideMessageSquareText: LucideIcon;

// MessageSquareWarning aliases
export declare const MessageSquareWarningIcon: LucideIcon;
export declare const LucideMessageSquareWarning: LucideIcon;

// MessageSquareX aliases
export declare const MessageSquareXIcon: LucideIcon;
export declare const LucideMessageSquareX: LucideIcon;

// MessageSquare aliases
export declare const MessageSquareIcon: LucideIcon;
export declare const LucideMessageSquare: LucideIcon;

// MessagesSquare aliases
export declare const MessagesSquareIcon: LucideIcon;
export declare const LucideMessagesSquare: LucideIcon;

// Mic2 aliases
export declare const Mic2Icon: LucideIcon;
export declare const LucideMic2: LucideIcon;

// MicOff aliases
export declare const MicOffIcon: LucideIcon;
export declare const LucideMicOff: LucideIcon;

// Mic aliases
export declare const MicIcon: LucideIcon;
export declare const LucideMic: LucideIcon;

// Microscope aliases
export declare const MicroscopeIcon: LucideIcon;
export declare const LucideMicroscope: LucideIcon;

// Microwave aliases
export declare const MicrowaveIcon: LucideIcon;
export declare const LucideMicrowave: LucideIcon;

// Milestone aliases
export declare const MilestoneIcon: LucideIcon;
export declare const LucideMilestone: LucideIcon;

// MilkOff aliases
export declare const MilkOffIcon: LucideIcon;
export declare const LucideMilkOff: LucideIcon;

// Milk aliases
export declare const MilkIcon: LucideIcon;
export declare const LucideMilk: LucideIcon;

// Minimize2 aliases
export declare const Minimize2Icon: LucideIcon;
export declare const LucideMinimize2: LucideIcon;

// Minimize aliases
export declare const MinimizeIcon: LucideIcon;
export declare const LucideMinimize: LucideIcon;

// MinusCircle aliases
export declare const MinusCircleIcon: LucideIcon;
export declare const LucideMinusCircle: LucideIcon;

// MinusSquare aliases
export declare const MinusSquareIcon: LucideIcon;
export declare const LucideMinusSquare: LucideIcon;

// Minus aliases
export declare const MinusIcon: LucideIcon;
export declare const LucideMinus: LucideIcon;

// MonitorCheck aliases
export declare const MonitorCheckIcon: LucideIcon;
export declare const LucideMonitorCheck: LucideIcon;

// MonitorDot aliases
export declare const MonitorDotIcon: LucideIcon;
export declare const LucideMonitorDot: LucideIcon;

// MonitorDown aliases
export declare const MonitorDownIcon: LucideIcon;
export declare const LucideMonitorDown: LucideIcon;

// MonitorOff aliases
export declare const MonitorOffIcon: LucideIcon;
export declare const LucideMonitorOff: LucideIcon;

// MonitorPause aliases
export declare const MonitorPauseIcon: LucideIcon;
export declare const LucideMonitorPause: LucideIcon;

// MonitorPlay aliases
export declare const MonitorPlayIcon: LucideIcon;
export declare const LucideMonitorPlay: LucideIcon;

// MonitorSmartphone aliases
export declare const MonitorSmartphoneIcon: LucideIcon;
export declare const LucideMonitorSmartphone: LucideIcon;

// MonitorSpeaker aliases
export declare const MonitorSpeakerIcon: LucideIcon;
export declare const LucideMonitorSpeaker: LucideIcon;

// MonitorStop aliases
export declare const MonitorStopIcon: LucideIcon;
export declare const LucideMonitorStop: LucideIcon;

// MonitorUp aliases
export declare const MonitorUpIcon: LucideIcon;
export declare const LucideMonitorUp: LucideIcon;

// MonitorX aliases
export declare const MonitorXIcon: LucideIcon;
export declare const LucideMonitorX: LucideIcon;

// Monitor aliases
export declare const MonitorIcon: LucideIcon;
export declare const LucideMonitor: LucideIcon;

// MoonStar aliases
export declare const MoonStarIcon: LucideIcon;
export declare const LucideMoonStar: LucideIcon;

// Moon aliases
export declare const MoonIcon: LucideIcon;
export declare const LucideMoon: LucideIcon;

// MoreHorizontal aliases
export declare const MoreHorizontalIcon: LucideIcon;
export declare const LucideMoreHorizontal: LucideIcon;

// MoreVertical aliases
export declare const MoreVerticalIcon: LucideIcon;
export declare const LucideMoreVertical: LucideIcon;

// MountainSnow aliases
export declare const MountainSnowIcon: LucideIcon;
export declare const LucideMountainSnow: LucideIcon;

// Mountain aliases
export declare const MountainIcon: LucideIcon;
export declare const LucideMountain: LucideIcon;

// MousePointer2 aliases
export declare const MousePointer2Icon: LucideIcon;
export declare const LucideMousePointer2: LucideIcon;

// MousePointerClick aliases
export declare const MousePointerClickIcon: LucideIcon;
export declare const LucideMousePointerClick: LucideIcon;

// MousePointerSquareDashed aliases
export declare const MousePointerSquareDashedIcon: LucideIcon;
export declare const LucideMousePointerSquareDashed: LucideIcon;

// MousePointerSquare aliases
export declare const MousePointerSquareIcon: LucideIcon;
export declare const LucideMousePointerSquare: LucideIcon;
export declare const Inspect: LucideIcon;

// MousePointer aliases
export declare const MousePointerIcon: LucideIcon;
export declare const LucideMousePointer: LucideIcon;

// Mouse aliases
export declare const MouseIcon: LucideIcon;
export declare const LucideMouse: LucideIcon;

// Move3d aliases
export declare const Move3dIcon: LucideIcon;
export declare const LucideMove3d: LucideIcon;
export declare const Move3D: LucideIcon;

// MoveDiagonal2 aliases
export declare const MoveDiagonal2Icon: LucideIcon;
export declare const LucideMoveDiagonal2: LucideIcon;

// MoveDiagonal aliases
export declare const MoveDiagonalIcon: LucideIcon;
export declare const LucideMoveDiagonal: LucideIcon;

// MoveDownLeft aliases
export declare const MoveDownLeftIcon: LucideIcon;
export declare const LucideMoveDownLeft: LucideIcon;

// MoveDownRight aliases
export declare const MoveDownRightIcon: LucideIcon;
export declare const LucideMoveDownRight: LucideIcon;

// MoveDown aliases
export declare const MoveDownIcon: LucideIcon;
export declare const LucideMoveDown: LucideIcon;

// MoveHorizontal aliases
export declare const MoveHorizontalIcon: LucideIcon;
export declare const LucideMoveHorizontal: LucideIcon;

// MoveLeft aliases
export declare const MoveLeftIcon: LucideIcon;
export declare const LucideMoveLeft: LucideIcon;

// MoveRight aliases
export declare const MoveRightIcon: LucideIcon;
export declare const LucideMoveRight: LucideIcon;

// MoveUpLeft aliases
export declare const MoveUpLeftIcon: LucideIcon;
export declare const LucideMoveUpLeft: LucideIcon;

// MoveUpRight aliases
export declare const MoveUpRightIcon: LucideIcon;
export declare const LucideMoveUpRight: LucideIcon;

// MoveUp aliases
export declare const MoveUpIcon: LucideIcon;
export declare const LucideMoveUp: LucideIcon;

// MoveVertical aliases
export declare const MoveVerticalIcon: LucideIcon;
export declare const LucideMoveVertical: LucideIcon;

// Move aliases
export declare const MoveIcon: LucideIcon;
export declare const LucideMove: LucideIcon;

// Music2 aliases
export declare const Music2Icon: LucideIcon;
export declare const LucideMusic2: LucideIcon;

// Music3 aliases
export declare const Music3Icon: LucideIcon;
export declare const LucideMusic3: LucideIcon;

// Music4 aliases
export declare const Music4Icon: LucideIcon;
export declare const LucideMusic4: LucideIcon;

// Music aliases
export declare const MusicIcon: LucideIcon;
export declare const LucideMusic: LucideIcon;

// Navigation2Off aliases
export declare const Navigation2OffIcon: LucideIcon;
export declare const LucideNavigation2Off: LucideIcon;

// Navigation2 aliases
export declare const Navigation2Icon: LucideIcon;
export declare const LucideNavigation2: LucideIcon;

// NavigationOff aliases
export declare const NavigationOffIcon: LucideIcon;
export declare const LucideNavigationOff: LucideIcon;

// Navigation aliases
export declare const NavigationIcon: LucideIcon;
export declare const LucideNavigation: LucideIcon;

// Network aliases
export declare const NetworkIcon: LucideIcon;
export declare const LucideNetwork: LucideIcon;

// Newspaper aliases
export declare const NewspaperIcon: LucideIcon;
export declare const LucideNewspaper: LucideIcon;

// Nfc aliases
export declare const NfcIcon: LucideIcon;
export declare const LucideNfc: LucideIcon;

// NutOff aliases
export declare const NutOffIcon: LucideIcon;
export declare const LucideNutOff: LucideIcon;

// Nut aliases
export declare const NutIcon: LucideIcon;
export declare const LucideNut: LucideIcon;

// Octagon aliases
export declare const OctagonIcon: LucideIcon;
export declare const LucideOctagon: LucideIcon;

// Option aliases
export declare const OptionIcon: LucideIcon;
export declare const LucideOption: LucideIcon;

// Orbit aliases
export declare const OrbitIcon: LucideIcon;
export declare const LucideOrbit: LucideIcon;

// Outdent aliases
export declare const OutdentIcon: LucideIcon;
export declare const LucideOutdent: LucideIcon;

// Package2 aliases
export declare const Package2Icon: LucideIcon;
export declare const LucidePackage2: LucideIcon;

// PackageCheck aliases
export declare const PackageCheckIcon: LucideIcon;
export declare const LucidePackageCheck: LucideIcon;

// PackageMinus aliases
export declare const PackageMinusIcon: LucideIcon;
export declare const LucidePackageMinus: LucideIcon;

// PackageOpen aliases
export declare const PackageOpenIcon: LucideIcon;
export declare const LucidePackageOpen: LucideIcon;

// PackagePlus aliases
export declare const PackagePlusIcon: LucideIcon;
export declare const LucidePackagePlus: LucideIcon;

// PackageSearch aliases
export declare const PackageSearchIcon: LucideIcon;
export declare const LucidePackageSearch: LucideIcon;

// PackageX aliases
export declare const PackageXIcon: LucideIcon;
export declare const LucidePackageX: LucideIcon;

// Package aliases
export declare const PackageIcon: LucideIcon;
export declare const LucidePackage: LucideIcon;

// PaintBucket aliases
export declare const PaintBucketIcon: LucideIcon;
export declare const LucidePaintBucket: LucideIcon;

// Paintbrush2 aliases
export declare const Paintbrush2Icon: LucideIcon;
export declare const LucidePaintbrush2: LucideIcon;

// Paintbrush aliases
export declare const PaintbrushIcon: LucideIcon;
export declare const LucidePaintbrush: LucideIcon;

// Palette aliases
export declare const PaletteIcon: LucideIcon;
export declare const LucidePalette: LucideIcon;

// Palmtree aliases
export declare const PalmtreeIcon: LucideIcon;
export declare const LucidePalmtree: LucideIcon;

// PanelBottomClose aliases
export declare const PanelBottomCloseIcon: LucideIcon;
export declare const LucidePanelBottomClose: LucideIcon;

// PanelBottomDashed aliases
export declare const PanelBottomDashedIcon: LucideIcon;
export declare const LucidePanelBottomDashed: LucideIcon;
export declare const PanelBottomInactive: LucideIcon;

// PanelBottomOpen aliases
export declare const PanelBottomOpenIcon: LucideIcon;
export declare const LucidePanelBottomOpen: LucideIcon;

// PanelBottom aliases
export declare const PanelBottomIcon: LucideIcon;
export declare const LucidePanelBottom: LucideIcon;

// PanelLeftClose aliases
export declare const PanelLeftCloseIcon: LucideIcon;
export declare const LucidePanelLeftClose: LucideIcon;
export declare const SidebarClose: LucideIcon;

// PanelLeftDashed aliases
export declare const PanelLeftDashedIcon: LucideIcon;
export declare const LucidePanelLeftDashed: LucideIcon;
export declare const PanelLeftInactive: LucideIcon;

// PanelLeftOpen aliases
export declare const PanelLeftOpenIcon: LucideIcon;
export declare const LucidePanelLeftOpen: LucideIcon;
export declare const SidebarOpen: LucideIcon;

// PanelLeft aliases
export declare const PanelLeftIcon: LucideIcon;
export declare const LucidePanelLeft: LucideIcon;
export declare const Sidebar: LucideIcon;

// PanelRightClose aliases
export declare const PanelRightCloseIcon: LucideIcon;
export declare const LucidePanelRightClose: LucideIcon;

// PanelRightDashed aliases
export declare const PanelRightDashedIcon: LucideIcon;
export declare const LucidePanelRightDashed: LucideIcon;
export declare const PanelRightInactive: LucideIcon;

// PanelRightOpen aliases
export declare const PanelRightOpenIcon: LucideIcon;
export declare const LucidePanelRightOpen: LucideIcon;

// PanelRight aliases
export declare const PanelRightIcon: LucideIcon;
export declare const LucidePanelRight: LucideIcon;

// PanelTopClose aliases
export declare const PanelTopCloseIcon: LucideIcon;
export declare const LucidePanelTopClose: LucideIcon;

// PanelTopDashed aliases
export declare const PanelTopDashedIcon: LucideIcon;
export declare const LucidePanelTopDashed: LucideIcon;
export declare const PanelTopInactive: LucideIcon;

// PanelTopOpen aliases
export declare const PanelTopOpenIcon: LucideIcon;
export declare const LucidePanelTopOpen: LucideIcon;

// PanelTop aliases
export declare const PanelTopIcon: LucideIcon;
export declare const LucidePanelTop: LucideIcon;

// PanelsLeftBottom aliases
export declare const PanelsLeftBottomIcon: LucideIcon;
export declare const LucidePanelsLeftBottom: LucideIcon;

// PanelsRightBottom aliases
export declare const PanelsRightBottomIcon: LucideIcon;
export declare const LucidePanelsRightBottom: LucideIcon;

// PanelsTopLeft aliases
export declare const PanelsTopLeftIcon: LucideIcon;
export declare const LucidePanelsTopLeft: LucideIcon;
export declare const Layout: LucideIcon;

// Paperclip aliases
export declare const PaperclipIcon: LucideIcon;
export declare const LucidePaperclip: LucideIcon;

// Parentheses aliases
export declare const ParenthesesIcon: LucideIcon;
export declare const LucideParentheses: LucideIcon;

// ParkingCircleOff aliases
export declare const ParkingCircleOffIcon: LucideIcon;
export declare const LucideParkingCircleOff: LucideIcon;

// ParkingCircle aliases
export declare const ParkingCircleIcon: LucideIcon;
export declare const LucideParkingCircle: LucideIcon;

// ParkingMeter aliases
export declare const ParkingMeterIcon: LucideIcon;
export declare const LucideParkingMeter: LucideIcon;

// ParkingSquareOff aliases
export declare const ParkingSquareOffIcon: LucideIcon;
export declare const LucideParkingSquareOff: LucideIcon;

// ParkingSquare aliases
export declare const ParkingSquareIcon: LucideIcon;
export declare const LucideParkingSquare: LucideIcon;

// PartyPopper aliases
export declare const PartyPopperIcon: LucideIcon;
export declare const LucidePartyPopper: LucideIcon;

// PauseCircle aliases
export declare const PauseCircleIcon: LucideIcon;
export declare const LucidePauseCircle: LucideIcon;

// PauseOctagon aliases
export declare const PauseOctagonIcon: LucideIcon;
export declare const LucidePauseOctagon: LucideIcon;

// Pause aliases
export declare const PauseIcon: LucideIcon;
export declare const LucidePause: LucideIcon;

// PawPrint aliases
export declare const PawPrintIcon: LucideIcon;
export declare const LucidePawPrint: LucideIcon;

// PcCase aliases
export declare const PcCaseIcon: LucideIcon;
export declare const LucidePcCase: LucideIcon;

// PenLine aliases
export declare const PenLineIcon: LucideIcon;
export declare const LucidePenLine: LucideIcon;
export declare const Edit3: LucideIcon;

// PenSquare aliases
export declare const PenSquareIcon: LucideIcon;
export declare const LucidePenSquare: LucideIcon;
export declare const PenBox: LucideIcon;
export declare const Edit: LucideIcon;

// PenTool aliases
export declare const PenToolIcon: LucideIcon;
export declare const LucidePenTool: LucideIcon;

// Pen aliases
export declare const PenIcon: LucideIcon;
export declare const LucidePen: LucideIcon;
export declare const Edit2: LucideIcon;

// PencilLine aliases
export declare const PencilLineIcon: LucideIcon;
export declare const LucidePencilLine: LucideIcon;

// PencilRuler aliases
export declare const PencilRulerIcon: LucideIcon;
export declare const LucidePencilRuler: LucideIcon;

// Pencil aliases
export declare const PencilIcon: LucideIcon;
export declare const LucidePencil: LucideIcon;

// Pentagon aliases
export declare const PentagonIcon: LucideIcon;
export declare const LucidePentagon: LucideIcon;

// PercentCircle aliases
export declare const PercentCircleIcon: LucideIcon;
export declare const LucidePercentCircle: LucideIcon;

// PercentDiamond aliases
export declare const PercentDiamondIcon: LucideIcon;
export declare const LucidePercentDiamond: LucideIcon;

// PercentSquare aliases
export declare const PercentSquareIcon: LucideIcon;
export declare const LucidePercentSquare: LucideIcon;

// Percent aliases
export declare const PercentIcon: LucideIcon;
export declare const LucidePercent: LucideIcon;

// PersonStanding aliases
export declare const PersonStandingIcon: LucideIcon;
export declare const LucidePersonStanding: LucideIcon;

// PhoneCall aliases
export declare const PhoneCallIcon: LucideIcon;
export declare const LucidePhoneCall: LucideIcon;

// PhoneForwarded aliases
export declare const PhoneForwardedIcon: LucideIcon;
export declare const LucidePhoneForwarded: LucideIcon;

// PhoneIncoming aliases
export declare const PhoneIncomingIcon: LucideIcon;
export declare const LucidePhoneIncoming: LucideIcon;

// PhoneMissed aliases
export declare const PhoneMissedIcon: LucideIcon;
export declare const LucidePhoneMissed: LucideIcon;

// PhoneOff aliases
export declare const PhoneOffIcon: LucideIcon;
export declare const LucidePhoneOff: LucideIcon;

// PhoneOutgoing aliases
export declare const PhoneOutgoingIcon: LucideIcon;
export declare const LucidePhoneOutgoing: LucideIcon;

// Phone aliases
export declare const PhoneIcon: LucideIcon;
export declare const LucidePhone: LucideIcon;

// PiSquare aliases
export declare const PiSquareIcon: LucideIcon;
export declare const LucidePiSquare: LucideIcon;

// Pi aliases
export declare const PiIcon: LucideIcon;
export declare const LucidePi: LucideIcon;

// Piano aliases
export declare const PianoIcon: LucideIcon;
export declare const LucidePiano: LucideIcon;

// PictureInPicture2 aliases
export declare const PictureInPicture2Icon: LucideIcon;
export declare const LucidePictureInPicture2: LucideIcon;

// PictureInPicture aliases
export declare const PictureInPictureIcon: LucideIcon;
export declare const LucidePictureInPicture: LucideIcon;

// PieChart aliases
export declare const PieChartIcon: LucideIcon;
export declare const LucidePieChart: LucideIcon;

// PiggyBank aliases
export declare const PiggyBankIcon: LucideIcon;
export declare const LucidePiggyBank: LucideIcon;

// PilcrowSquare aliases
export declare const PilcrowSquareIcon: LucideIcon;
export declare const LucidePilcrowSquare: LucideIcon;

// Pilcrow aliases
export declare const PilcrowIcon: LucideIcon;
export declare const LucidePilcrow: LucideIcon;

// Pill aliases
export declare const PillIcon: LucideIcon;
export declare const LucidePill: LucideIcon;

// PinOff aliases
export declare const PinOffIcon: LucideIcon;
export declare const LucidePinOff: LucideIcon;

// Pin aliases
export declare const PinIcon: LucideIcon;
export declare const LucidePin: LucideIcon;

// Pipette aliases
export declare const PipetteIcon: LucideIcon;
export declare const LucidePipette: LucideIcon;

// Pizza aliases
export declare const PizzaIcon: LucideIcon;
export declare const LucidePizza: LucideIcon;

// PlaneLanding aliases
export declare const PlaneLandingIcon: LucideIcon;
export declare const LucidePlaneLanding: LucideIcon;

// PlaneTakeoff aliases
export declare const PlaneTakeoffIcon: LucideIcon;
export declare const LucidePlaneTakeoff: LucideIcon;

// Plane aliases
export declare const PlaneIcon: LucideIcon;
export declare const LucidePlane: LucideIcon;

// PlayCircle aliases
export declare const PlayCircleIcon: LucideIcon;
export declare const LucidePlayCircle: LucideIcon;

// PlaySquare aliases
export declare const PlaySquareIcon: LucideIcon;
export declare const LucidePlaySquare: LucideIcon;

// Play aliases
export declare const PlayIcon: LucideIcon;
export declare const LucidePlay: LucideIcon;

// Plug2 aliases
export declare const Plug2Icon: LucideIcon;
export declare const LucidePlug2: LucideIcon;

// PlugZap2 aliases
export declare const PlugZap2Icon: LucideIcon;
export declare const LucidePlugZap2: LucideIcon;

// PlugZap aliases
export declare const PlugZapIcon: LucideIcon;
export declare const LucidePlugZap: LucideIcon;

// Plug aliases
export declare const PlugIcon: LucideIcon;
export declare const LucidePlug: LucideIcon;

// PlusCircle aliases
export declare const PlusCircleIcon: LucideIcon;
export declare const LucidePlusCircle: LucideIcon;

// PlusSquare aliases
export declare const PlusSquareIcon: LucideIcon;
export declare const LucidePlusSquare: LucideIcon;

// Plus aliases
export declare const PlusIcon: LucideIcon;
export declare const LucidePlus: LucideIcon;

// PocketKnife aliases
export declare const PocketKnifeIcon: LucideIcon;
export declare const LucidePocketKnife: LucideIcon;

// Pocket aliases
export declare const PocketIcon: LucideIcon;
export declare const LucidePocket: LucideIcon;

// Podcast aliases
export declare const PodcastIcon: LucideIcon;
export declare const LucidePodcast: LucideIcon;

// PointerOff aliases
export declare const PointerOffIcon: LucideIcon;
export declare const LucidePointerOff: LucideIcon;

// Pointer aliases
export declare const PointerIcon: LucideIcon;
export declare const LucidePointer: LucideIcon;

// Popcorn aliases
export declare const PopcornIcon: LucideIcon;
export declare const LucidePopcorn: LucideIcon;

// Popsicle aliases
export declare const PopsicleIcon: LucideIcon;
export declare const LucidePopsicle: LucideIcon;

// PoundSterling aliases
export declare const PoundSterlingIcon: LucideIcon;
export declare const LucidePoundSterling: LucideIcon;

// PowerCircle aliases
export declare const PowerCircleIcon: LucideIcon;
export declare const LucidePowerCircle: LucideIcon;

// PowerOff aliases
export declare const PowerOffIcon: LucideIcon;
export declare const LucidePowerOff: LucideIcon;

// PowerSquare aliases
export declare const PowerSquareIcon: LucideIcon;
export declare const LucidePowerSquare: LucideIcon;

// Power aliases
export declare const PowerIcon: LucideIcon;
export declare const LucidePower: LucideIcon;

// Presentation aliases
export declare const PresentationIcon: LucideIcon;
export declare const LucidePresentation: LucideIcon;

// Printer aliases
export declare const PrinterIcon: LucideIcon;
export declare const LucidePrinter: LucideIcon;

// Projector aliases
export declare const ProjectorIcon: LucideIcon;
export declare const LucideProjector: LucideIcon;

// Puzzle aliases
export declare const PuzzleIcon: LucideIcon;
export declare const LucidePuzzle: LucideIcon;

// Pyramid aliases
export declare const PyramidIcon: LucideIcon;
export declare const LucidePyramid: LucideIcon;

// QrCode aliases
export declare const QrCodeIcon: LucideIcon;
export declare const LucideQrCode: LucideIcon;

// Quote aliases
export declare const QuoteIcon: LucideIcon;
export declare const LucideQuote: LucideIcon;

// Rabbit aliases
export declare const RabbitIcon: LucideIcon;
export declare const LucideRabbit: LucideIcon;

// Radar aliases
export declare const RadarIcon: LucideIcon;
export declare const LucideRadar: LucideIcon;

// Radiation aliases
export declare const RadiationIcon: LucideIcon;
export declare const LucideRadiation: LucideIcon;

// RadioReceiver aliases
export declare const RadioReceiverIcon: LucideIcon;
export declare const LucideRadioReceiver: LucideIcon;

// RadioTower aliases
export declare const RadioTowerIcon: LucideIcon;
export declare const LucideRadioTower: LucideIcon;

// Radio aliases
export declare const RadioIcon: LucideIcon;
export declare const LucideRadio: LucideIcon;

// Radius aliases
export declare const RadiusIcon: LucideIcon;
export declare const LucideRadius: LucideIcon;

// RailSymbol aliases
export declare const RailSymbolIcon: LucideIcon;
export declare const LucideRailSymbol: LucideIcon;

// Rainbow aliases
export declare const RainbowIcon: LucideIcon;
export declare const LucideRainbow: LucideIcon;

// Rat aliases
export declare const RatIcon: LucideIcon;
export declare const LucideRat: LucideIcon;

// Ratio aliases
export declare const RatioIcon: LucideIcon;
export declare const LucideRatio: LucideIcon;

// Receipt aliases
export declare const ReceiptIcon: LucideIcon;
export declare const LucideReceipt: LucideIcon;

// RectangleHorizontal aliases
export declare const RectangleHorizontalIcon: LucideIcon;
export declare const LucideRectangleHorizontal: LucideIcon;

// RectangleVertical aliases
export declare const RectangleVerticalIcon: LucideIcon;
export declare const LucideRectangleVertical: LucideIcon;

// Recycle aliases
export declare const RecycleIcon: LucideIcon;
export declare const LucideRecycle: LucideIcon;

// Redo2 aliases
export declare const Redo2Icon: LucideIcon;
export declare const LucideRedo2: LucideIcon;

// RedoDot aliases
export declare const RedoDotIcon: LucideIcon;
export declare const LucideRedoDot: LucideIcon;

// Redo aliases
export declare const RedoIcon: LucideIcon;
export declare const LucideRedo: LucideIcon;

// RefreshCcwDot aliases
export declare const RefreshCcwDotIcon: LucideIcon;
export declare const LucideRefreshCcwDot: LucideIcon;

// RefreshCcw aliases
export declare const RefreshCcwIcon: LucideIcon;
export declare const LucideRefreshCcw: LucideIcon;

// RefreshCwOff aliases
export declare const RefreshCwOffIcon: LucideIcon;
export declare const LucideRefreshCwOff: LucideIcon;

// RefreshCw aliases
export declare const RefreshCwIcon: LucideIcon;
export declare const LucideRefreshCw: LucideIcon;

// Refrigerator aliases
export declare const RefrigeratorIcon: LucideIcon;
export declare const LucideRefrigerator: LucideIcon;

// Regex aliases
export declare const RegexIcon: LucideIcon;
export declare const LucideRegex: LucideIcon;

// RemoveFormatting aliases
export declare const RemoveFormattingIcon: LucideIcon;
export declare const LucideRemoveFormatting: LucideIcon;

// Repeat1 aliases
export declare const Repeat1Icon: LucideIcon;
export declare const LucideRepeat1: LucideIcon;

// Repeat2 aliases
export declare const Repeat2Icon: LucideIcon;
export declare const LucideRepeat2: LucideIcon;

// Repeat aliases
export declare const RepeatIcon: LucideIcon;
export declare const LucideRepeat: LucideIcon;

// ReplaceAll aliases
export declare const ReplaceAllIcon: LucideIcon;
export declare const LucideReplaceAll: LucideIcon;

// Replace aliases
export declare const ReplaceIcon: LucideIcon;
export declare const LucideReplace: LucideIcon;

// ReplyAll aliases
export declare const ReplyAllIcon: LucideIcon;
export declare const LucideReplyAll: LucideIcon;

// Reply aliases
export declare const ReplyIcon: LucideIcon;
export declare const LucideReply: LucideIcon;

// Rewind aliases
export declare const RewindIcon: LucideIcon;
export declare const LucideRewind: LucideIcon;

// Ribbon aliases
export declare const RibbonIcon: LucideIcon;
export declare const LucideRibbon: LucideIcon;

// Rocket aliases
export declare const RocketIcon: LucideIcon;
export declare const LucideRocket: LucideIcon;

// RockingChair aliases
export declare const RockingChairIcon: LucideIcon;
export declare const LucideRockingChair: LucideIcon;

// RollerCoaster aliases
export declare const RollerCoasterIcon: LucideIcon;
export declare const LucideRollerCoaster: LucideIcon;

// Rotate3d aliases
export declare const Rotate3dIcon: LucideIcon;
export declare const LucideRotate3d: LucideIcon;
export declare const Rotate3D: LucideIcon;

// RotateCcw aliases
export declare const RotateCcwIcon: LucideIcon;
export declare const LucideRotateCcw: LucideIcon;

// RotateCw aliases
export declare const RotateCwIcon: LucideIcon;
export declare const LucideRotateCw: LucideIcon;

// RouteOff aliases
export declare const RouteOffIcon: LucideIcon;
export declare const LucideRouteOff: LucideIcon;

// Route aliases
export declare const RouteIcon: LucideIcon;
export declare const LucideRoute: LucideIcon;

// Router aliases
export declare const RouterIcon: LucideIcon;
export declare const LucideRouter: LucideIcon;

// Rows2 aliases
export declare const Rows2Icon: LucideIcon;
export declare const LucideRows2: LucideIcon;
export declare const Rows: LucideIcon;

// Rows3 aliases
export declare const Rows3Icon: LucideIcon;
export declare const LucideRows3: LucideIcon;
export declare const PanelsTopBottom: LucideIcon;

// Rows4 aliases
export declare const Rows4Icon: LucideIcon;
export declare const LucideRows4: LucideIcon;

// Rss aliases
export declare const RssIcon: LucideIcon;
export declare const LucideRss: LucideIcon;

// Ruler aliases
export declare const RulerIcon: LucideIcon;
export declare const LucideRuler: LucideIcon;

// RussianRuble aliases
export declare const RussianRubleIcon: LucideIcon;
export declare const LucideRussianRuble: LucideIcon;

// Sailboat aliases
export declare const SailboatIcon: LucideIcon;
export declare const LucideSailboat: LucideIcon;

// Salad aliases
export declare const SaladIcon: LucideIcon;
export declare const LucideSalad: LucideIcon;

// Sandwich aliases
export declare const SandwichIcon: LucideIcon;
export declare const LucideSandwich: LucideIcon;

// SatelliteDish aliases
export declare const SatelliteDishIcon: LucideIcon;
export declare const LucideSatelliteDish: LucideIcon;

// Satellite aliases
export declare const SatelliteIcon: LucideIcon;
export declare const LucideSatellite: LucideIcon;

// SaveAll aliases
export declare const SaveAllIcon: LucideIcon;
export declare const LucideSaveAll: LucideIcon;

// Save aliases
export declare const SaveIcon: LucideIcon;
export declare const LucideSave: LucideIcon;

// Scale3d aliases
export declare const Scale3dIcon: LucideIcon;
export declare const LucideScale3d: LucideIcon;
export declare const Scale3D: LucideIcon;

// Scale aliases
export declare const ScaleIcon: LucideIcon;
export declare const LucideScale: LucideIcon;

// Scaling aliases
export declare const ScalingIcon: LucideIcon;
export declare const LucideScaling: LucideIcon;

// ScanBarcode aliases
export declare const ScanBarcodeIcon: LucideIcon;
export declare const LucideScanBarcode: LucideIcon;

// ScanEye aliases
export declare const ScanEyeIcon: LucideIcon;
export declare const LucideScanEye: LucideIcon;

// ScanFace aliases
export declare const ScanFaceIcon: LucideIcon;
export declare const LucideScanFace: LucideIcon;

// ScanLine aliases
export declare const ScanLineIcon: LucideIcon;
export declare const LucideScanLine: LucideIcon;

// ScanSearch aliases
export declare const ScanSearchIcon: LucideIcon;
export declare const LucideScanSearch: LucideIcon;

// ScanText aliases
export declare const ScanTextIcon: LucideIcon;
export declare const LucideScanText: LucideIcon;

// Scan aliases
export declare const ScanIcon: LucideIcon;
export declare const LucideScan: LucideIcon;

// ScatterChart aliases
export declare const ScatterChartIcon: LucideIcon;
export declare const LucideScatterChart: LucideIcon;

// School2 aliases
export declare const School2Icon: LucideIcon;
export declare const LucideSchool2: LucideIcon;

// School aliases
export declare const SchoolIcon: LucideIcon;
export declare const LucideSchool: LucideIcon;

// ScissorsLineDashed aliases
export declare const ScissorsLineDashedIcon: LucideIcon;
export declare const LucideScissorsLineDashed: LucideIcon;

// ScissorsSquareDashedBottom aliases
export declare const ScissorsSquareDashedBottomIcon: LucideIcon;
export declare const LucideScissorsSquareDashedBottom: LucideIcon;

// ScissorsSquare aliases
export declare const ScissorsSquareIcon: LucideIcon;
export declare const LucideScissorsSquare: LucideIcon;

// Scissors aliases
export declare const ScissorsIcon: LucideIcon;
export declare const LucideScissors: LucideIcon;

// ScreenShareOff aliases
export declare const ScreenShareOffIcon: LucideIcon;
export declare const LucideScreenShareOff: LucideIcon;

// ScreenShare aliases
export declare const ScreenShareIcon: LucideIcon;
export declare const LucideScreenShare: LucideIcon;

// ScrollText aliases
export declare const ScrollTextIcon: LucideIcon;
export declare const LucideScrollText: LucideIcon;

// Scroll aliases
export declare const ScrollIcon: LucideIcon;
export declare const LucideScroll: LucideIcon;

// SearchCheck aliases
export declare const SearchCheckIcon: LucideIcon;
export declare const LucideSearchCheck: LucideIcon;

// SearchCode aliases
export declare const SearchCodeIcon: LucideIcon;
export declare const LucideSearchCode: LucideIcon;

// SearchSlash aliases
export declare const SearchSlashIcon: LucideIcon;
export declare const LucideSearchSlash: LucideIcon;

// SearchX aliases
export declare const SearchXIcon: LucideIcon;
export declare const LucideSearchX: LucideIcon;

// Search aliases
export declare const SearchIcon: LucideIcon;
export declare const LucideSearch: LucideIcon;

// SendHorizontal aliases
export declare const SendHorizontalIcon: LucideIcon;
export declare const LucideSendHorizontal: LucideIcon;
export declare const SendHorizonal: LucideIcon;

// SendToBack aliases
export declare const SendToBackIcon: LucideIcon;
export declare const LucideSendToBack: LucideIcon;

// Send aliases
export declare const SendIcon: LucideIcon;
export declare const LucideSend: LucideIcon;

// SeparatorHorizontal aliases
export declare const SeparatorHorizontalIcon: LucideIcon;
export declare const LucideSeparatorHorizontal: LucideIcon;

// SeparatorVertical aliases
export declare const SeparatorVerticalIcon: LucideIcon;
export declare const LucideSeparatorVertical: LucideIcon;

// ServerCog aliases
export declare const ServerCogIcon: LucideIcon;
export declare const LucideServerCog: LucideIcon;

// ServerCrash aliases
export declare const ServerCrashIcon: LucideIcon;
export declare const LucideServerCrash: LucideIcon;

// ServerOff aliases
export declare const ServerOffIcon: LucideIcon;
export declare const LucideServerOff: LucideIcon;

// Server aliases
export declare const ServerIcon: LucideIcon;
export declare const LucideServer: LucideIcon;

// Settings2 aliases
export declare const Settings2Icon: LucideIcon;
export declare const LucideSettings2: LucideIcon;

// Settings aliases
export declare const SettingsIcon: LucideIcon;
export declare const LucideSettings: LucideIcon;

// Shapes aliases
export declare const ShapesIcon: LucideIcon;
export declare const LucideShapes: LucideIcon;

// Share2 aliases
export declare const Share2Icon: LucideIcon;
export declare const LucideShare2: LucideIcon;

// Share aliases
export declare const ShareIcon: LucideIcon;
export declare const LucideShare: LucideIcon;

// Sheet aliases
export declare const SheetIcon: LucideIcon;
export declare const LucideSheet: LucideIcon;

// Shell aliases
export declare const ShellIcon: LucideIcon;
export declare const LucideShell: LucideIcon;

// ShieldAlert aliases
export declare const ShieldAlertIcon: LucideIcon;
export declare const LucideShieldAlert: LucideIcon;

// ShieldBan aliases
export declare const ShieldBanIcon: LucideIcon;
export declare const LucideShieldBan: LucideIcon;

// ShieldCheck aliases
export declare const ShieldCheckIcon: LucideIcon;
export declare const LucideShieldCheck: LucideIcon;

// ShieldEllipsis aliases
export declare const ShieldEllipsisIcon: LucideIcon;
export declare const LucideShieldEllipsis: LucideIcon;

// ShieldHalf aliases
export declare const ShieldHalfIcon: LucideIcon;
export declare const LucideShieldHalf: LucideIcon;

// ShieldMinus aliases
export declare const ShieldMinusIcon: LucideIcon;
export declare const LucideShieldMinus: LucideIcon;

// ShieldOff aliases
export declare const ShieldOffIcon: LucideIcon;
export declare const LucideShieldOff: LucideIcon;

// ShieldPlus aliases
export declare const ShieldPlusIcon: LucideIcon;
export declare const LucideShieldPlus: LucideIcon;

// ShieldQuestion aliases
export declare const ShieldQuestionIcon: LucideIcon;
export declare const LucideShieldQuestion: LucideIcon;

// ShieldX aliases
export declare const ShieldXIcon: LucideIcon;
export declare const LucideShieldX: LucideIcon;
export declare const ShieldClose: LucideIcon;

// Shield aliases
export declare const ShieldIcon: LucideIcon;
export declare const LucideShield: LucideIcon;

// ShipWheel aliases
export declare const ShipWheelIcon: LucideIcon;
export declare const LucideShipWheel: LucideIcon;

// Ship aliases
export declare const ShipIcon: LucideIcon;
export declare const LucideShip: LucideIcon;

// Shirt aliases
export declare const ShirtIcon: LucideIcon;
export declare const LucideShirt: LucideIcon;

// ShoppingBag aliases
export declare const ShoppingBagIcon: LucideIcon;
export declare const LucideShoppingBag: LucideIcon;

// ShoppingBasket aliases
export declare const ShoppingBasketIcon: LucideIcon;
export declare const LucideShoppingBasket: LucideIcon;

// ShoppingCart aliases
export declare const ShoppingCartIcon: LucideIcon;
export declare const LucideShoppingCart: LucideIcon;

// Shovel aliases
export declare const ShovelIcon: LucideIcon;
export declare const LucideShovel: LucideIcon;

// ShowerHead aliases
export declare const ShowerHeadIcon: LucideIcon;
export declare const LucideShowerHead: LucideIcon;

// Shrink aliases
export declare const ShrinkIcon: LucideIcon;
export declare const LucideShrink: LucideIcon;

// Shrub aliases
export declare const ShrubIcon: LucideIcon;
export declare const LucideShrub: LucideIcon;

// Shuffle aliases
export declare const ShuffleIcon: LucideIcon;
export declare const LucideShuffle: LucideIcon;

// SigmaSquare aliases
export declare const SigmaSquareIcon: LucideIcon;
export declare const LucideSigmaSquare: LucideIcon;

// Sigma aliases
export declare const SigmaIcon: LucideIcon;
export declare const LucideSigma: LucideIcon;

// SignalHigh aliases
export declare const SignalHighIcon: LucideIcon;
export declare const LucideSignalHigh: LucideIcon;

// SignalLow aliases
export declare const SignalLowIcon: LucideIcon;
export declare const LucideSignalLow: LucideIcon;

// SignalMedium aliases
export declare const SignalMediumIcon: LucideIcon;
export declare const LucideSignalMedium: LucideIcon;

// SignalZero aliases
export declare const SignalZeroIcon: LucideIcon;
export declare const LucideSignalZero: LucideIcon;

// Signal aliases
export declare const SignalIcon: LucideIcon;
export declare const LucideSignal: LucideIcon;

// SignpostBig aliases
export declare const SignpostBigIcon: LucideIcon;
export declare const LucideSignpostBig: LucideIcon;

// Signpost aliases
export declare const SignpostIcon: LucideIcon;
export declare const LucideSignpost: LucideIcon;

// Siren aliases
export declare const SirenIcon: LucideIcon;
export declare const LucideSiren: LucideIcon;

// SkipBack aliases
export declare const SkipBackIcon: LucideIcon;
export declare const LucideSkipBack: LucideIcon;

// SkipForward aliases
export declare const SkipForwardIcon: LucideIcon;
export declare const LucideSkipForward: LucideIcon;

// Skull aliases
export declare const SkullIcon: LucideIcon;
export declare const LucideSkull: LucideIcon;

// Slack aliases
export declare const SlackIcon: LucideIcon;
export declare const LucideSlack: LucideIcon;

// Slash aliases
export declare const SlashIcon: LucideIcon;
export declare const LucideSlash: LucideIcon;

// Slice aliases
export declare const SliceIcon: LucideIcon;
export declare const LucideSlice: LucideIcon;

// SlidersHorizontal aliases
export declare const SlidersHorizontalIcon: LucideIcon;
export declare const LucideSlidersHorizontal: LucideIcon;

// Sliders aliases
export declare const SlidersIcon: LucideIcon;
export declare const LucideSliders: LucideIcon;

// SmartphoneCharging aliases
export declare const SmartphoneChargingIcon: LucideIcon;
export declare const LucideSmartphoneCharging: LucideIcon;

// SmartphoneNfc aliases
export declare const SmartphoneNfcIcon: LucideIcon;
export declare const LucideSmartphoneNfc: LucideIcon;

// Smartphone aliases
export declare const SmartphoneIcon: LucideIcon;
export declare const LucideSmartphone: LucideIcon;

// SmilePlus aliases
export declare const SmilePlusIcon: LucideIcon;
export declare const LucideSmilePlus: LucideIcon;

// Smile aliases
export declare const SmileIcon: LucideIcon;
export declare const LucideSmile: LucideIcon;

// Snail aliases
export declare const SnailIcon: LucideIcon;
export declare const LucideSnail: LucideIcon;

// Snowflake aliases
export declare const SnowflakeIcon: LucideIcon;
export declare const LucideSnowflake: LucideIcon;

// Sofa aliases
export declare const SofaIcon: LucideIcon;
export declare const LucideSofa: LucideIcon;

// Soup aliases
export declare const SoupIcon: LucideIcon;
export declare const LucideSoup: LucideIcon;

// Space aliases
export declare const SpaceIcon: LucideIcon;
export declare const LucideSpace: LucideIcon;

// Spade aliases
export declare const SpadeIcon: LucideIcon;
export declare const LucideSpade: LucideIcon;

// Sparkle aliases
export declare const SparkleIcon: LucideIcon;
export declare const LucideSparkle: LucideIcon;

// Sparkles aliases
export declare const SparklesIcon: LucideIcon;
export declare const LucideSparkles: LucideIcon;
export declare const Stars: LucideIcon;

// Speaker aliases
export declare const SpeakerIcon: LucideIcon;
export declare const LucideSpeaker: LucideIcon;

// Speech aliases
export declare const SpeechIcon: LucideIcon;
export declare const LucideSpeech: LucideIcon;

// SpellCheck2 aliases
export declare const SpellCheck2Icon: LucideIcon;
export declare const LucideSpellCheck2: LucideIcon;

// SpellCheck aliases
export declare const SpellCheckIcon: LucideIcon;
export declare const LucideSpellCheck: LucideIcon;

// Spline aliases
export declare const SplineIcon: LucideIcon;
export declare const LucideSpline: LucideIcon;

// SplitSquareHorizontal aliases
export declare const SplitSquareHorizontalIcon: LucideIcon;
export declare const LucideSplitSquareHorizontal: LucideIcon;

// SplitSquareVertical aliases
export declare const SplitSquareVerticalIcon: LucideIcon;
export declare const LucideSplitSquareVertical: LucideIcon;

// Split aliases
export declare const SplitIcon: LucideIcon;
export declare const LucideSplit: LucideIcon;

// SprayCan aliases
export declare const SprayCanIcon: LucideIcon;
export declare const LucideSprayCan: LucideIcon;

// Sprout aliases
export declare const SproutIcon: LucideIcon;
export declare const LucideSprout: LucideIcon;

// SquareAsterisk aliases
export declare const SquareAsteriskIcon: LucideIcon;
export declare const LucideSquareAsterisk: LucideIcon;

// SquareCode aliases
export declare const SquareCodeIcon: LucideIcon;
export declare const LucideSquareCode: LucideIcon;

// SquareDashedBottomCode aliases
export declare const SquareDashedBottomCodeIcon: LucideIcon;
export declare const LucideSquareDashedBottomCode: LucideIcon;

// SquareDashedBottom aliases
export declare const SquareDashedBottomIcon: LucideIcon;
export declare const LucideSquareDashedBottom: LucideIcon;

// SquareDot aliases
export declare const SquareDotIcon: LucideIcon;
export declare const LucideSquareDot: LucideIcon;

// SquareEqual aliases
export declare const SquareEqualIcon: LucideIcon;
export declare const LucideSquareEqual: LucideIcon;

// SquareSlash aliases
export declare const SquareSlashIcon: LucideIcon;
export declare const LucideSquareSlash: LucideIcon;

// SquareStack aliases
export declare const SquareStackIcon: LucideIcon;
export declare const LucideSquareStack: LucideIcon;

// SquareUserRound aliases
export declare const SquareUserRoundIcon: LucideIcon;
export declare const LucideSquareUserRound: LucideIcon;
export declare const UserSquare2: LucideIcon;

// SquareUser aliases
export declare const SquareUserIcon: LucideIcon;
export declare const LucideSquareUser: LucideIcon;
export declare const UserSquare: LucideIcon;

// Square aliases
export declare const SquareIcon: LucideIcon;
export declare const LucideSquare: LucideIcon;

// Squircle aliases
export declare const SquircleIcon: LucideIcon;
export declare const LucideSquircle: LucideIcon;

// Squirrel aliases
export declare const SquirrelIcon: LucideIcon;
export declare const LucideSquirrel: LucideIcon;

// Stamp aliases
export declare const StampIcon: LucideIcon;
export declare const LucideStamp: LucideIcon;

// StarHalf aliases
export declare const StarHalfIcon: LucideIcon;
export declare const LucideStarHalf: LucideIcon;

// StarOff aliases
export declare const StarOffIcon: LucideIcon;
export declare const LucideStarOff: LucideIcon;

// Star aliases
export declare const StarIcon: LucideIcon;
export declare const LucideStar: LucideIcon;

// StepBack aliases
export declare const StepBackIcon: LucideIcon;
export declare const LucideStepBack: LucideIcon;

// StepForward aliases
export declare const StepForwardIcon: LucideIcon;
export declare const LucideStepForward: LucideIcon;

// Stethoscope aliases
export declare const StethoscopeIcon: LucideIcon;
export declare const LucideStethoscope: LucideIcon;

// Sticker aliases
export declare const StickerIcon: LucideIcon;
export declare const LucideSticker: LucideIcon;

// StickyNote aliases
export declare const StickyNoteIcon: LucideIcon;
export declare const LucideStickyNote: LucideIcon;

// StopCircle aliases
export declare const StopCircleIcon: LucideIcon;
export declare const LucideStopCircle: LucideIcon;

// Store aliases
export declare const StoreIcon: LucideIcon;
export declare const LucideStore: LucideIcon;

// StretchHorizontal aliases
export declare const StretchHorizontalIcon: LucideIcon;
export declare const LucideStretchHorizontal: LucideIcon;

// StretchVertical aliases
export declare const StretchVerticalIcon: LucideIcon;
export declare const LucideStretchVertical: LucideIcon;

// Strikethrough aliases
export declare const StrikethroughIcon: LucideIcon;
export declare const LucideStrikethrough: LucideIcon;

// Subscript aliases
export declare const SubscriptIcon: LucideIcon;
export declare const LucideSubscript: LucideIcon;

// Subtitles aliases
export declare const SubtitlesIcon: LucideIcon;
export declare const LucideSubtitles: LucideIcon;

// SunDim aliases
export declare const SunDimIcon: LucideIcon;
export declare const LucideSunDim: LucideIcon;

// SunMedium aliases
export declare const SunMediumIcon: LucideIcon;
export declare const LucideSunMedium: LucideIcon;

// SunMoon aliases
export declare const SunMoonIcon: LucideIcon;
export declare const LucideSunMoon: LucideIcon;

// SunSnow aliases
export declare const SunSnowIcon: LucideIcon;
export declare const LucideSunSnow: LucideIcon;

// Sun aliases
export declare const SunIcon: LucideIcon;
export declare const LucideSun: LucideIcon;

// Sunrise aliases
export declare const SunriseIcon: LucideIcon;
export declare const LucideSunrise: LucideIcon;

// Sunset aliases
export declare const SunsetIcon: LucideIcon;
export declare const LucideSunset: LucideIcon;

// Superscript aliases
export declare const SuperscriptIcon: LucideIcon;
export declare const LucideSuperscript: LucideIcon;

// SwissFranc aliases
export declare const SwissFrancIcon: LucideIcon;
export declare const LucideSwissFranc: LucideIcon;

// SwitchCamera aliases
export declare const SwitchCameraIcon: LucideIcon;
export declare const LucideSwitchCamera: LucideIcon;

// Sword aliases
export declare const SwordIcon: LucideIcon;
export declare const LucideSword: LucideIcon;

// Swords aliases
export declare const SwordsIcon: LucideIcon;
export declare const LucideSwords: LucideIcon;

// Syringe aliases
export declare const SyringeIcon: LucideIcon;
export declare const LucideSyringe: LucideIcon;

// Table2 aliases
export declare const Table2Icon: LucideIcon;
export declare const LucideTable2: LucideIcon;

// TableProperties aliases
export declare const TablePropertiesIcon: LucideIcon;
export declare const LucideTableProperties: LucideIcon;

// Table aliases
export declare const TableIcon: LucideIcon;
export declare const LucideTable: LucideIcon;

// TabletSmartphone aliases
export declare const TabletSmartphoneIcon: LucideIcon;
export declare const LucideTabletSmartphone: LucideIcon;

// Tablet aliases
export declare const TabletIcon: LucideIcon;
export declare const LucideTablet: LucideIcon;

// Tablets aliases
export declare const TabletsIcon: LucideIcon;
export declare const LucideTablets: LucideIcon;

// Tag aliases
export declare const TagIcon: LucideIcon;
export declare const LucideTag: LucideIcon;

// Tags aliases
export declare const TagsIcon: LucideIcon;
export declare const LucideTags: LucideIcon;

// Tally1 aliases
export declare const Tally1Icon: LucideIcon;
export declare const LucideTally1: LucideIcon;

// Tally2 aliases
export declare const Tally2Icon: LucideIcon;
export declare const LucideTally2: LucideIcon;

// Tally3 aliases
export declare const Tally3Icon: LucideIcon;
export declare const LucideTally3: LucideIcon;

// Tally4 aliases
export declare const Tally4Icon: LucideIcon;
export declare const LucideTally4: LucideIcon;

// Tally5 aliases
export declare const Tally5Icon: LucideIcon;
export declare const LucideTally5: LucideIcon;

// Tangent aliases
export declare const TangentIcon: LucideIcon;
export declare const LucideTangent: LucideIcon;

// Target aliases
export declare const TargetIcon: LucideIcon;
export declare const LucideTarget: LucideIcon;

// TentTree aliases
export declare const TentTreeIcon: LucideIcon;
export declare const LucideTentTree: LucideIcon;

// Tent aliases
export declare const TentIcon: LucideIcon;
export declare const LucideTent: LucideIcon;

// TerminalSquare aliases
export declare const TerminalSquareIcon: LucideIcon;
export declare const LucideTerminalSquare: LucideIcon;

// Terminal aliases
export declare const TerminalIcon: LucideIcon;
export declare const LucideTerminal: LucideIcon;

// TestTube2 aliases
export declare const TestTube2Icon: LucideIcon;
export declare const LucideTestTube2: LucideIcon;

// TestTube aliases
export declare const TestTubeIcon: LucideIcon;
export declare const LucideTestTube: LucideIcon;

// TestTubes aliases
export declare const TestTubesIcon: LucideIcon;
export declare const LucideTestTubes: LucideIcon;

// TextCursorInput aliases
export declare const TextCursorInputIcon: LucideIcon;
export declare const LucideTextCursorInput: LucideIcon;

// TextCursor aliases
export declare const TextCursorIcon: LucideIcon;
export declare const LucideTextCursor: LucideIcon;

// TextQuote aliases
export declare const TextQuoteIcon: LucideIcon;
export declare const LucideTextQuote: LucideIcon;

// TextSelect aliases
export declare const TextSelectIcon: LucideIcon;
export declare const LucideTextSelect: LucideIcon;
export declare const TextSelection: LucideIcon;

// Text aliases
export declare const TextIcon: LucideIcon;
export declare const LucideText: LucideIcon;

// Theater aliases
export declare const TheaterIcon: LucideIcon;
export declare const LucideTheater: LucideIcon;

// ThermometerSnowflake aliases
export declare const ThermometerSnowflakeIcon: LucideIcon;
export declare const LucideThermometerSnowflake: LucideIcon;

// ThermometerSun aliases
export declare const ThermometerSunIcon: LucideIcon;
export declare const LucideThermometerSun: LucideIcon;

// Thermometer aliases
export declare const ThermometerIcon: LucideIcon;
export declare const LucideThermometer: LucideIcon;

// ThumbsDown aliases
export declare const ThumbsDownIcon: LucideIcon;
export declare const LucideThumbsDown: LucideIcon;

// ThumbsUp aliases
export declare const ThumbsUpIcon: LucideIcon;
export declare const LucideThumbsUp: LucideIcon;

// Ticket aliases
export declare const TicketIcon: LucideIcon;
export declare const LucideTicket: LucideIcon;

// TimerOff aliases
export declare const TimerOffIcon: LucideIcon;
export declare const LucideTimerOff: LucideIcon;

// TimerReset aliases
export declare const TimerResetIcon: LucideIcon;
export declare const LucideTimerReset: LucideIcon;

// Timer aliases
export declare const TimerIcon: LucideIcon;
export declare const LucideTimer: LucideIcon;

// ToggleLeft aliases
export declare const ToggleLeftIcon: LucideIcon;
export declare const LucideToggleLeft: LucideIcon;

// ToggleRight aliases
export declare const ToggleRightIcon: LucideIcon;
export declare const LucideToggleRight: LucideIcon;

// Tornado aliases
export declare const TornadoIcon: LucideIcon;
export declare const LucideTornado: LucideIcon;

// Torus aliases
export declare const TorusIcon: LucideIcon;
export declare const LucideTorus: LucideIcon;

// TouchpadOff aliases
export declare const TouchpadOffIcon: LucideIcon;
export declare const LucideTouchpadOff: LucideIcon;

// Touchpad aliases
export declare const TouchpadIcon: LucideIcon;
export declare const LucideTouchpad: LucideIcon;

// TowerControl aliases
export declare const TowerControlIcon: LucideIcon;
export declare const LucideTowerControl: LucideIcon;

// ToyBrick aliases
export declare const ToyBrickIcon: LucideIcon;
export declare const LucideToyBrick: LucideIcon;

// Tractor aliases
export declare const TractorIcon: LucideIcon;
export declare const LucideTractor: LucideIcon;

// TrafficCone aliases
export declare const TrafficConeIcon: LucideIcon;
export declare const LucideTrafficCone: LucideIcon;

// TrainFrontTunnel aliases
export declare const TrainFrontTunnelIcon: LucideIcon;
export declare const LucideTrainFrontTunnel: LucideIcon;

// TrainFront aliases
export declare const TrainFrontIcon: LucideIcon;
export declare const LucideTrainFront: LucideIcon;

// TrainTrack aliases
export declare const TrainTrackIcon: LucideIcon;
export declare const LucideTrainTrack: LucideIcon;

// TramFront aliases
export declare const TramFrontIcon: LucideIcon;
export declare const LucideTramFront: LucideIcon;
export declare const Train: LucideIcon;

// Trash2 aliases
export declare const Trash2Icon: LucideIcon;
export declare const LucideTrash2: LucideIcon;

// Trash aliases
export declare const TrashIcon: LucideIcon;
export declare const LucideTrash: LucideIcon;

// TreeDeciduous aliases
export declare const TreeDeciduousIcon: LucideIcon;
export declare const LucideTreeDeciduous: LucideIcon;

// TreePine aliases
export declare const TreePineIcon: LucideIcon;
export declare const LucideTreePine: LucideIcon;

// Trees aliases
export declare const TreesIcon: LucideIcon;
export declare const LucideTrees: LucideIcon;

// Trello aliases
export declare const TrelloIcon: LucideIcon;
export declare const LucideTrello: LucideIcon;

// TrendingDown aliases
export declare const TrendingDownIcon: LucideIcon;
export declare const LucideTrendingDown: LucideIcon;

// TrendingUp aliases
export declare const TrendingUpIcon: LucideIcon;
export declare const LucideTrendingUp: LucideIcon;

// TriangleRight aliases
export declare const TriangleRightIcon: LucideIcon;
export declare const LucideTriangleRight: LucideIcon;

// Triangle aliases
export declare const TriangleIcon: LucideIcon;
export declare const LucideTriangle: LucideIcon;

// Trophy aliases
export declare const TrophyIcon: LucideIcon;
export declare const LucideTrophy: LucideIcon;

// Truck aliases
export declare const TruckIcon: LucideIcon;
export declare const LucideTruck: LucideIcon;

// Turtle aliases
export declare const TurtleIcon: LucideIcon;
export declare const LucideTurtle: LucideIcon;

// Tv2 aliases
export declare const Tv2Icon: LucideIcon;
export declare const LucideTv2: LucideIcon;

// Tv aliases
export declare const TvIcon: LucideIcon;
export declare const LucideTv: LucideIcon;

// Twitch aliases
export declare const TwitchIcon: LucideIcon;
export declare const LucideTwitch: LucideIcon;

// Twitter aliases
export declare const TwitterIcon: LucideIcon;
export declare const LucideTwitter: LucideIcon;

// Type aliases
export declare const TypeIcon: LucideIcon;
export declare const LucideType: LucideIcon;

// UmbrellaOff aliases
export declare const UmbrellaOffIcon: LucideIcon;
export declare const LucideUmbrellaOff: LucideIcon;

// Umbrella aliases
export declare const UmbrellaIcon: LucideIcon;
export declare const LucideUmbrella: LucideIcon;

// Underline aliases
export declare const UnderlineIcon: LucideIcon;
export declare const LucideUnderline: LucideIcon;

// Undo2 aliases
export declare const Undo2Icon: LucideIcon;
export declare const LucideUndo2: LucideIcon;

// UndoDot aliases
export declare const UndoDotIcon: LucideIcon;
export declare const LucideUndoDot: LucideIcon;

// Undo aliases
export declare const UndoIcon: LucideIcon;
export declare const LucideUndo: LucideIcon;

// UnfoldHorizontal aliases
export declare const UnfoldHorizontalIcon: LucideIcon;
export declare const LucideUnfoldHorizontal: LucideIcon;

// UnfoldVertical aliases
export declare const UnfoldVerticalIcon: LucideIcon;
export declare const LucideUnfoldVertical: LucideIcon;

// Ungroup aliases
export declare const UngroupIcon: LucideIcon;
export declare const LucideUngroup: LucideIcon;

// Unlink2 aliases
export declare const Unlink2Icon: LucideIcon;
export declare const LucideUnlink2: LucideIcon;

// Unlink aliases
export declare const UnlinkIcon: LucideIcon;
export declare const LucideUnlink: LucideIcon;

// UnlockKeyhole aliases
export declare const UnlockKeyholeIcon: LucideIcon;
export declare const LucideUnlockKeyhole: LucideIcon;

// Unlock aliases
export declare const UnlockIcon: LucideIcon;
export declare const LucideUnlock: LucideIcon;

// Unplug aliases
export declare const UnplugIcon: LucideIcon;
export declare const LucideUnplug: LucideIcon;

// UploadCloud aliases
export declare const UploadCloudIcon: LucideIcon;
export declare const LucideUploadCloud: LucideIcon;

// Upload aliases
export declare const UploadIcon: LucideIcon;
export declare const LucideUpload: LucideIcon;

// Usb aliases
export declare const UsbIcon: LucideIcon;
export declare const LucideUsb: LucideIcon;

// UserCheck aliases
export declare const UserCheckIcon: LucideIcon;
export declare const LucideUserCheck: LucideIcon;

// UserCog aliases
export declare const UserCogIcon: LucideIcon;
export declare const LucideUserCog: LucideIcon;

// UserMinus aliases
export declare const UserMinusIcon: LucideIcon;
export declare const LucideUserMinus: LucideIcon;

// UserPlus aliases
export declare const UserPlusIcon: LucideIcon;
export declare const LucideUserPlus: LucideIcon;

// UserRoundCheck aliases
export declare const UserRoundCheckIcon: LucideIcon;
export declare const LucideUserRoundCheck: LucideIcon;
export declare const UserCheck2: LucideIcon;

// UserRoundCog aliases
export declare const UserRoundCogIcon: LucideIcon;
export declare const LucideUserRoundCog: LucideIcon;
export declare const UserCog2: LucideIcon;

// UserRoundMinus aliases
export declare const UserRoundMinusIcon: LucideIcon;
export declare const LucideUserRoundMinus: LucideIcon;
export declare const UserMinus2: LucideIcon;

// UserRoundPlus aliases
export declare const UserRoundPlusIcon: LucideIcon;
export declare const LucideUserRoundPlus: LucideIcon;
export declare const UserPlus2: LucideIcon;

// UserRoundSearch aliases
export declare const UserRoundSearchIcon: LucideIcon;
export declare const LucideUserRoundSearch: LucideIcon;

// UserRoundX aliases
export declare const UserRoundXIcon: LucideIcon;
export declare const LucideUserRoundX: LucideIcon;
export declare const UserX2: LucideIcon;

// UserRound aliases
export declare const UserRoundIcon: LucideIcon;
export declare const LucideUserRound: LucideIcon;
export declare const User2: LucideIcon;

// UserSearch aliases
export declare const UserSearchIcon: LucideIcon;
export declare const LucideUserSearch: LucideIcon;

// UserX aliases
export declare const UserXIcon: LucideIcon;
export declare const LucideUserX: LucideIcon;

// User aliases
export declare const UserIcon: LucideIcon;
export declare const LucideUser: LucideIcon;

// UsersRound aliases
export declare const UsersRoundIcon: LucideIcon;
export declare const LucideUsersRound: LucideIcon;
export declare const Users2: LucideIcon;

// Users aliases
export declare const UsersIcon: LucideIcon;
export declare const LucideUsers: LucideIcon;

// UtensilsCrossed aliases
export declare const UtensilsCrossedIcon: LucideIcon;
export declare const LucideUtensilsCrossed: LucideIcon;

// Utensils aliases
export declare const UtensilsIcon: LucideIcon;
export declare const LucideUtensils: LucideIcon;

// UtilityPole aliases
export declare const UtilityPoleIcon: LucideIcon;
export declare const LucideUtilityPole: LucideIcon;

// Variable aliases
export declare const VariableIcon: LucideIcon;
export declare const LucideVariable: LucideIcon;

// Vegan aliases
export declare const VeganIcon: LucideIcon;
export declare const LucideVegan: LucideIcon;

// VenetianMask aliases
export declare const VenetianMaskIcon: LucideIcon;
export declare const LucideVenetianMask: LucideIcon;

// VibrateOff aliases
export declare const VibrateOffIcon: LucideIcon;
export declare const LucideVibrateOff: LucideIcon;

// Vibrate aliases
export declare const VibrateIcon: LucideIcon;
export declare const LucideVibrate: LucideIcon;

// VideoOff aliases
export declare const VideoOffIcon: LucideIcon;
export declare const LucideVideoOff: LucideIcon;

// Video aliases
export declare const VideoIcon: LucideIcon;
export declare const LucideVideo: LucideIcon;

// Videotape aliases
export declare const VideotapeIcon: LucideIcon;
export declare const LucideVideotape: LucideIcon;

// View aliases
export declare const ViewIcon: LucideIcon;
export declare const LucideView: LucideIcon;

// Voicemail aliases
export declare const VoicemailIcon: LucideIcon;
export declare const LucideVoicemail: LucideIcon;

// Volume1 aliases
export declare const Volume1Icon: LucideIcon;
export declare const LucideVolume1: LucideIcon;

// Volume2 aliases
export declare const Volume2Icon: LucideIcon;
export declare const LucideVolume2: LucideIcon;

// VolumeX aliases
export declare const VolumeXIcon: LucideIcon;
export declare const LucideVolumeX: LucideIcon;

// Volume aliases
export declare const VolumeIcon: LucideIcon;
export declare const LucideVolume: LucideIcon;

// Vote aliases
export declare const VoteIcon: LucideIcon;
export declare const LucideVote: LucideIcon;

// Wallet2 aliases
export declare const Wallet2Icon: LucideIcon;
export declare const LucideWallet2: LucideIcon;

// WalletCards aliases
export declare const WalletCardsIcon: LucideIcon;
export declare const LucideWalletCards: LucideIcon;

// Wallet aliases
export declare const WalletIcon: LucideIcon;
export declare const LucideWallet: LucideIcon;

// Wallpaper aliases
export declare const WallpaperIcon: LucideIcon;
export declare const LucideWallpaper: LucideIcon;

// Wand2 aliases
export declare const Wand2Icon: LucideIcon;
export declare const LucideWand2: LucideIcon;

// Wand aliases
export declare const WandIcon: LucideIcon;
export declare const LucideWand: LucideIcon;

// Warehouse aliases
export declare const WarehouseIcon: LucideIcon;
export declare const LucideWarehouse: LucideIcon;

// Watch aliases
export declare const WatchIcon: LucideIcon;
export declare const LucideWatch: LucideIcon;

// Waves aliases
export declare const WavesIcon: LucideIcon;
export declare const LucideWaves: LucideIcon;

// Waypoints aliases
export declare const WaypointsIcon: LucideIcon;
export declare const LucideWaypoints: LucideIcon;

// Webcam aliases
export declare const WebcamIcon: LucideIcon;
export declare const LucideWebcam: LucideIcon;

// Webhook aliases
export declare const WebhookIcon: LucideIcon;
export declare const LucideWebhook: LucideIcon;

// Weight aliases
export declare const WeightIcon: LucideIcon;
export declare const LucideWeight: LucideIcon;

// WheatOff aliases
export declare const WheatOffIcon: LucideIcon;
export declare const LucideWheatOff: LucideIcon;

// Wheat aliases
export declare const WheatIcon: LucideIcon;
export declare const LucideWheat: LucideIcon;

// WholeWord aliases
export declare const WholeWordIcon: LucideIcon;
export declare const LucideWholeWord: LucideIcon;

// WifiOff aliases
export declare const WifiOffIcon: LucideIcon;
export declare const LucideWifiOff: LucideIcon;

// Wifi aliases
export declare const WifiIcon: LucideIcon;
export declare const LucideWifi: LucideIcon;

// Wind aliases
export declare const WindIcon: LucideIcon;
export declare const LucideWind: LucideIcon;

// WineOff aliases
export declare const WineOffIcon: LucideIcon;
export declare const LucideWineOff: LucideIcon;

// Wine aliases
export declare const WineIcon: LucideIcon;
export declare const LucideWine: LucideIcon;

// Workflow aliases
export declare const WorkflowIcon: LucideIcon;
export declare const LucideWorkflow: LucideIcon;

// WrapText aliases
export declare const WrapTextIcon: LucideIcon;
export declare const LucideWrapText: LucideIcon;

// Wrench aliases
export declare const WrenchIcon: LucideIcon;
export declare const LucideWrench: LucideIcon;

// XCircle aliases
export declare const XCircleIcon: LucideIcon;
export declare const LucideXCircle: LucideIcon;

// XOctagon aliases
export declare const XOctagonIcon: LucideIcon;
export declare const LucideXOctagon: LucideIcon;

// XSquare aliases
export declare const XSquareIcon: LucideIcon;
export declare const LucideXSquare: LucideIcon;

// X aliases
export declare const XIcon: LucideIcon;
export declare const LucideX: LucideIcon;

// Youtube aliases
export declare const YoutubeIcon: LucideIcon;
export declare const LucideYoutube: LucideIcon;

// ZapOff aliases
export declare const ZapOffIcon: LucideIcon;
export declare const LucideZapOff: LucideIcon;

// Zap aliases
export declare const ZapIcon: LucideIcon;
export declare const LucideZap: LucideIcon;

// ZoomIn aliases
export declare const ZoomInIcon: LucideIcon;
export declare const LucideZoomIn: LucideIcon;

// ZoomOut aliases
export declare const ZoomOutIcon: LucideIcon;
export declare const LucideZoomOut: LucideIcon;

