// Global variable with Figma's plugin API.
declare const figma: PluginAPI
declare const __html__: string

interface PluginAPI {
  readonly currentPage: PageNode

  // Root of the current Figma document.
  readonly root: DocumentNode

  // API for accessing viewport information.
  readonly viewport: ViewportAPI

  // call this once your plugin is finished executing.
  closePlugin(): void

  // Command that the user chose through menu when launching the plugin.
  readonly command: string

  // Finds a node by its id. If not found, returns null.
  getNodeById(id: string): BaseNode | null

  // Finds a style by its id. If not found, returns null.
  getStyleById(id: string): BaseStyle | null

  // Access browser APIs and/or show UI to the user.
  showUI(html: string, options?: ShowUIOptions): void
  readonly ui: UIAPI

  // Lets you store persistent data on the user's local machine
  readonly clientStorage: ClientStorageAPI

  // This value is returned when a property is in a "mixed" state.
  // In order to check if a property is in a mixed state, always
  // compare directly to this value. I.e.
  // `if (node.cornerRadius === figma.mixed) { ... }`
  mixed: symbol

  // Creates new nodes. Nodes will start off inserted
  // into the current page.
  // To move them elsewhere use `appendChild` or `insertChild`
  createRectangle(): RectangleNode
  createLine(): LineNode
  createEllipse(): EllipseNode
  createPolygon(): PolygonNode
  createStar(): StarNode
  createVector(): VectorNode
  createText(): TextNode
  createBooleanOperation(): BooleanOperationNode
  createFrame(): FrameNode
  createComponent(): ComponentNode
  createPage(): PageNode
  createSlice(): SliceNode

  // Creates styles. A style's id can be assigned to
  // node properties like textStyleId, fillStyleId, etc.
  createPaintStyle(): PaintStyle
  createTextStyle(): TextStyle
  createEffectStyle(): EffectStyle
  createGridStyle(): GridStyle

  // These let you insert stuff from the team library if you have the key
  importComponentByKeyAsync(key: string): Promise<ComponentNode>
  importStyleByKeyAsync(key: string): Promise<BaseStyle>

  // Return all fonts currently supported for use with the "fontName" property
  listAvailableFontsAsync(): Promise<Font[]>

  // You must await the promise returned here before being able to use "fontName"
  loadFontAsync(fontName: FontName): Promise<void>

  // Creates node from an SVG string.
  createNodeFromSvg(svg: string): FrameNode

  // Creates an Image object using the provided file contents.
  createImage(data: Uint8Array): Image

  // Groups every node in `nodes` under a new group.
  group(nodes: ReadonlyArray<BaseNode>, parent: BaseNode & ChildrenMixin, index?: number): FrameNode

  // Flattens every node in `nodes` into a single vector network.
  flatten(nodes: ReadonlyArray<BaseNode>, parent?: BaseNode & ChildrenMixin, index?: number): VectorNode
}

interface ClientStorageAPI {
  // This stores information in the browser, not on the server. It's similar to localStorage, but is
  // asynchronous, and allows storing objects, arrays, strings, numbers, booleans, null, undefined and Uint8Arrays.
  getAsync(key: string): Promise<any | undefined>
  setAsync(key: string, value: any): Promise<void>
}

type ShowUIOptions = {
  visible?: boolean, // defaults to true
  width?: number,    // defaults to 300
  height?: number,   // defaults to 200
}

interface UIAPI {
  show(): void
  hide(): void
  resize(width: number, height: number): void
  close(): void

  // Sends a message to the iframe.
  postMessage(pluginMessage: any): void

  // Registers a callback for messages sent by the iframe.
  onmessage: ((pluginMessage: any) => void) | undefined
}

interface ViewportAPI {
  center: { x: number, y: number }

  // 1.0 means 100% zoom, 0.5 means 50% zoom.
  zoom: number

  // Adjust the viewport such that it shows the provided nodes.
  scrollAndZoomIntoView(nodes: ReadonlyArray<BaseNode>)
}

// manifest.json format
interface ManifestJson {
  // Name of the plugin.
  name: string

  // Version of the runtime that the plugin uses, e.g. '0.5.0'.
  version: string

  // The file name that contains the plugin code.
  script: string

  // The file name that contains the html code made available in script.
  html?: string

  // Shell command to be executed before the contents of the `html` and `script` files are read.
  build?: string

  // Menu items to show up in UI.
  menu?: ManifestMenuItem[]
}

type ManifestMenuItem =
  // Clickable menu item.
  { name: string, command: string } |
  // Separator
  { separator: true } |
  // Submenu
  { name: string, menu: ManifestMenuItem[] }

////////////////////////////////////////////////////////////////////////////////
// Values

// These are the top two rows of a 3x3 matrix. This is enough to represent
// translation, rotation, and skew.
type Transform = [
  [number, number, number],
  [number, number, number]
]

interface Vector {
  readonly x: number
  readonly y: number
}

interface RGB {
  readonly r: number
  readonly g: number
  readonly b: number
}

interface RGBA {
  readonly r: number
  readonly g: number
  readonly b: number
  readonly a: number
}

interface FontName {
  readonly family: string
  readonly style: string
}

interface ArcData {
  readonly startingAngle: number
  readonly endingAngle: number
  readonly innerRadius: number
}

interface ShadowEffect {
  readonly type: "DROP_SHADOW" | "INNER_SHADOW"
  readonly color: RGBA
  readonly offset: Vector
  readonly radius: number
  readonly visible: boolean
  readonly blendMode: BlendMode
}

interface BlurEffect {
  readonly type: "LAYER_BLUR" | "BACKGROUND_BLUR"
  readonly radius: number
  readonly visible: boolean
}

type Effect = ShadowEffect | BlurEffect

type ConstraintType = "MIN" | "CENTER" | "MAX" | "STRETCH" | "SCALE"

interface Constraints {
  readonly horizontal: ConstraintType
  readonly vertical: ConstraintType
}

interface ColorStop {
  readonly position: number
  readonly color: RGBA
}

interface SolidPaint {
  readonly type: "SOLID"
  readonly color: RGB

  readonly visible?: boolean
  readonly opacity?: number
}

interface GradientPaint {
  readonly type: "GRADIENT_LINEAR" | "GRADIENT_RADIAL" | "GRADIENT_ANGULAR" | "GRADIENT_DIAMOND"
  readonly gradientTransform: Transform
  readonly gradientStops: ReadonlyArray<ColorStop>

  readonly visible?: boolean
  readonly opacity?: number
}

interface ImagePaint {
  readonly type: "IMAGE"
  readonly scaleMode: "FILL" | "FIT" | "CROP" | "TILE"
  readonly image: Image | null
  readonly imageTransform?: Transform // setting for "CROP"
  readonly scalingFactor?: number // setting for "TILE"

  readonly visible?: boolean
  readonly opacity?: number
}

type Paint = SolidPaint | GradientPaint | ImagePaint

interface Guide {
  readonly axis: "X" | "Y"
  readonly offset: number
}

interface RowsColsLayoutGrid {
  readonly pattern: "ROWS" | "COLUMNS"
  readonly alignment: "MIN" | "STRETCH" | "CENTER"
  readonly gutterSize: number

  readonly count: number        // Infinity when "Auto" is set in the UI
  readonly sectionSize?: number // Not set for alignment: "STRETCH"
  readonly offset?: number      // Not set for alignment: "CENTER"

  readonly visible?: boolean
  readonly color?: RGBA
}

interface GridLayoutGrid {
  readonly pattern: "GRID"
  readonly sectionSize: number

  readonly visible?: boolean
  readonly color?: RGBA
}

type LayoutGrid = RowsColsLayoutGrid | GridLayoutGrid

interface ExportSettingsImage {
  format: "JPG" | "PNG"
  contentsOnly?: boolean    // defaults to true
  suffix?: string
  constraint?: {            // defaults to unscaled ({ type: "SCALE", value: 1 })
    type: "SCALE" | "WIDTH" | "HEIGHT"
    value: number
  }
}

interface ExportSettingsSVG {
  format: "SVG"
  contentsOnly?: boolean    // defaults to true
  suffix?: string
  svgOutlineText?: boolean  // defaults to true
  svgIdAttribute?: boolean  // defaults to false
  svgSimplifyStroke?: boolean // defaults to true
}

interface ExportSettingsPDF {
  format: "PDF"
  contentsOnly?: boolean    // defaults to true
  suffix?: string
}

type ExportSettings = ExportSettingsImage | ExportSettingsSVG | ExportSettingsPDF

type WindingRule = "NONZERO" | "EVENODD"

interface VectorVertex {
  readonly x: number
  readonly y: number
  readonly strokeCap?: StrokeCap
  readonly strokeJoin?: StrokeJoin
  readonly cornerRadius?: number
  readonly handleMirroring?: HandleMirroring
}

interface VectorSegment {
  readonly start: number
  readonly end: number
  readonly tangentStart?: Vector  // Defaults to { x: 0, y: 0 }
  readonly tangentEnd?: Vector  // Defaults to { x: 0, y: 0 }
}

interface VectorRegion {
  readonly windingRule: WindingRule
  readonly loops: ReadonlyArray<ReadonlyArray<number>>
}

interface VectorNetwork {
  readonly vertices: ReadonlyArray<VectorVertex>
  readonly segments: ReadonlyArray<VectorSegment>
  readonly regions?: ReadonlyArray<VectorRegion> // Defaults to []
}

interface VectorPath {
  // Similar to the svg fill-rule
  // "NONE" means an open path won't have a fill
  readonly windingRule: WindingRule | "NONE"
  readonly data: string
}

type VectorPaths = ReadonlyArray<VectorPath>

interface NumberWithUnits {
  readonly value: number
  readonly units: "PIXELS" | "PERCENT"
}

type BlendMode =
  "PASS_THROUGH" |
  "NORMAL" |
  "DARKEN" |
  "MULTIPLY" |
  "LINEAR_BURN" |
  "COLOR_BURN" |
  "LIGHTEN" |
  "SCREEN" |
  "LINEAR_DODGE" |
  "COLOR_DODGE" |
  "OVERLAY" |
  "SOFT_LIGHT" |
  "HARD_LIGHT" |
  "DIFFERENCE" |
  "EXCLUSION" |
  "HUE" |
  "SATURATION" |
  "COLOR" |
  "LUMINOSITY"

interface Font {
  fontName: FontName
}

////////////////////////////////////////////////////////////////////////////////
// Mixins

interface BaseNodeMixin {
  readonly id: string
  readonly parent: (BaseNode & ChildrenMixin) | null
  name: string
  visible: boolean
  locked: boolean
  removed: boolean
  toString(): string
  remove(): void

  // Attach custom data to a node. Only your plugin will be able to read this.
  getPluginData(key: string): string
  setPluginData(key: string, value: string): void

  // Attach custom data to a node. All plugins will be able to read this.
  // Namespace is a string that must be at least 3 alphanumeric characters, and should
  // be a name related to your plugin. This is a mandatory argument to avoid multiple
  // multiple plugins adding keys like "data" and colliding with each other. Other
  // plugins will still be able to read shared plugin data as long as they know the
  // namespace you use.
  getSharedPluginData(namespace: string, key: string): string
  setSharedPluginData(namespace: string, key: string, value: string): void
}

interface ChildrenMixin {
  // Sorted back-to-front. I.e. the top-most child is last in this array.
  readonly children: ReadonlyArray<BaseNode>

  // Adds to the end of the .children array. I.e. visually on top of all other
  // children.
  appendChild(child: BaseNode): void

  insertChild(index: number, child: BaseNode): void
  findAll(callback?: (node: BaseNode) => boolean): ReadonlyArray<BaseNode>
  findOne(callback: (node: BaseNode) => boolean): BaseNode | null
}

interface LayoutMixin {
  readonly absoluteTransform: Transform
  relativeTransform: Transform
  x: number // The same as "relativeTransform[0][2]"
  y: number // The same as "relativeTransform[1][2]"
  rotation: number // The angle of the x axis of "relativeTransform" in degrees. Returns values from -180 to 180.

  readonly size: Vector
  readonly width: number // The same as "size.x"
  readonly height: number // The same as "size.y"

  // Resizes the node. If children of the node has constraints, it applies those constraints
  // width and height must be >= 0.01
  resize(width: number, height: number): void

  // Resizes the node. Children of the node are never resized, even if those children have
  // constraints. width and height must be >= 0.01
  resizeWithoutConstraints(width: number, height: number): void

  constraints: Constraints
}

interface BlendMixin {
  opacity: number
  blendMode: BlendMode
  isMask: boolean
  effects: ReadonlyArray<Effect>
  effectStyleId: string
}

interface FrameMixin {
  backgrounds: ReadonlyArray<Paint>
  layoutGrids: ReadonlyArray<LayoutGrid>
  clipsContent: boolean
  guides: ReadonlyArray<Guide>
  gridStyleId: string
  backgroundStyleId: string
}

type StrokeCap = "NONE" | "ROUND" | "SQUARE" | "ARROW_LINES" | "ARROW_EQUILATERAL"
type StrokeJoin = "MITER" | "BEVEL" | "ROUND"
type HandleMirroring = "NONE" | "ANGLE" | "ANGLE_AND_LENGTH"

interface GeometryMixin {
  fills: ReadonlyArray<Paint> | symbol // This can return figma.mixed on TEXT nodes
  strokes: ReadonlyArray<Paint>
  strokeWeight: number
  strokeAlign: "CENTER" | "INSIDE" | "OUTSIDE"
  strokeCap: StrokeCap | symbol // This can return figma.mixed on VECTOR nodes if vertices have different strokeCap values
  strokeJoin: StrokeJoin | symbol // This can return figma.mixed on VECTOR nodes if vertices have different strokeJoin values
  dashPattern: ReadonlyArray<number>
  fillStyleId: string | symbol // This can return figma.mixed on TEXT nodes
  strokeStyleId: string
}

interface CornerMixin {
  // This can return figma.mixed on VECTOR nodes if vertices have different cornerRadius values,
  // and on RECTANGLE nodes if node.topLeftRadius etc has different values
  cornerRadius: number | symbol

  cornerSmoothing: number
}

interface ExportMixin {
  exportSettings: ExportSettings[]
  exportAsync(settings?: ExportSettings): Promise<Uint8Array> // Defaults to PNG format
}

////////////////////////////////////////////////////////////////////////////////
// Nodes

interface DocumentNode extends BaseNodeMixin, ChildrenMixin {
  readonly type: "DOCUMENT"
  clone(): DocumentNode // Note: this always throws an error
}

interface PageNode extends BaseNodeMixin, ChildrenMixin, ExportMixin {
  readonly type: "PAGE"
  clone(): PageNode // cloned node starts off inserted into current page

  guides: ReadonlyArray<Guide>
  selection: ReadonlyArray<BaseNode>
}

interface FrameNode extends BaseNodeMixin, BlendMixin, ChildrenMixin, FrameMixin, LayoutMixin, ExportMixin {
  readonly type: "FRAME" | "GROUP"
  clone(): FrameNode // cloned node starts off inserted into current page
}

interface SliceNode extends BaseNodeMixin, LayoutMixin, ExportMixin {
  readonly type: "SLICE"
  clone(): SliceNode // cloned node starts off inserted into current page
}

interface RectangleNode extends BaseNodeMixin, BlendMixin, CornerMixin, GeometryMixin, LayoutMixin, ExportMixin {
  readonly type: "RECTANGLE"
  clone(): RectangleNode // cloned node starts off inserted into current page
  topLeftRadius: number
  topRightRadius: number
  bottomLeftRadius: number
  bottomRightRadius: number
}

interface LineNode extends BaseNodeMixin, BlendMixin, GeometryMixin, LayoutMixin, ExportMixin {
  readonly type: "LINE"
  clone(): LineNode // cloned node starts off inserted into current page
}

interface EllipseNode extends BaseNodeMixin, BlendMixin, CornerMixin, GeometryMixin, LayoutMixin, ExportMixin {
  readonly type: "ELLIPSE"
  clone(): EllipseNode // cloned node starts off inserted into current page
  arcData: ArcData
}

interface PolygonNode extends BaseNodeMixin, BlendMixin, CornerMixin, GeometryMixin, LayoutMixin, ExportMixin {
  readonly type: "POLYGON"
  clone(): PolygonNode // cloned node starts off inserted into current page
  pointCount: number
}

interface StarNode extends BaseNodeMixin, BlendMixin, CornerMixin, GeometryMixin, LayoutMixin, ExportMixin {
  readonly type: "STAR"
  clone(): StarNode // cloned node starts off inserted into current page
  pointCount: number

  // This is a percentage value from 0 to 1
  innerRadius: number
}

interface VectorNode extends BaseNodeMixin, BlendMixin, CornerMixin, GeometryMixin, LayoutMixin, ExportMixin {
  readonly type: "VECTOR"
  clone(): VectorNode // cloned node starts off inserted into current page
  vectorNetwork: VectorNetwork
  vectorPaths: VectorPaths
  handleMirroring: HandleMirroring | symbol // This can return figma.mixed if vertices have different handleMirroring values
}

interface TextNode extends BaseNodeMixin, BlendMixin, GeometryMixin, LayoutMixin, ExportMixin {
  readonly type: "TEXT"
  clone(): TextNode // cloned node starts off inserted into current page
  characters: string
  textAlignHorizontal: "LEFT" | "CENTER" | "RIGHT" | "JUSTIFIED"
  textAlignVertical: "TOP" | "CENTER" | "BOTTOM"
  textAutoResize: "NONE" | "WIDTH_AND_HEIGHT" | "HEIGHT"
  paragraphIndent: number
  paragraphSpacing: number
  autoRename: boolean

  // These properties can all return figma.mixed if the text has multiple values for the property
  textStyleId: string | symbol
  fontSize: number | symbol
  fontName: FontName | symbol
  textCase: "ORIGINAL" | "UPPER" | "LOWER" | "TITLE" | symbol
  textDecoration: "NONE" | "UNDERLINE" | "STRIKETHROUGH" | symbol
  letterSpacing: NumberWithUnits | symbol
  lineHeight: NumberWithUnits | symbol
}

interface ComponentNode extends BaseNodeMixin, BlendMixin, ChildrenMixin, FrameMixin, LayoutMixin, ExportMixin {
  readonly type: "COMPONENT"
  clone(): ComponentNode // cloned node starts off inserted into current page

  createInstance(): InstanceNode // instance starts off inserted into current page
  description: string
  readonly remote: boolean
  readonly key: string // The key to use with "importComponentByKeyAsync"
}

interface InstanceNode extends BaseNodeMixin, BlendMixin, ChildrenMixin, FrameMixin, LayoutMixin, ExportMixin {
  readonly type: "INSTANCE"
  clone(): InstanceNode // cloned node starts off inserted into current page
  masterComponent: ComponentNode
}

interface BooleanOperationNode extends BaseNodeMixin, BlendMixin, ChildrenMixin, CornerMixin, GeometryMixin, LayoutMixin, ExportMixin {
  readonly type: "BOOLEAN_OPERATION"
  clone(): BooleanOperationNode // cloned node starts off inserted into current page
  booleanOperation: "UNION" | "INTERSECT" | "SUBTRACT" | "EXCLUDE"
}

type BaseNode =
  DocumentNode |
  PageNode |
  SliceNode |
  FrameNode |
  ComponentNode |
  InstanceNode |
  BooleanOperationNode |
  VectorNode |
  StarNode |
  LineNode |
  EllipseNode |
  PolygonNode |
  RectangleNode |
  TextNode

type NodeType =
  "DOCUMENT" |
  "PAGE" |
  "SLICE" |
  "FRAME" |
  "GROUP" |
  "COMPONENT" |
  "INSTANCE" |
  "BOOLEAN_OPERATION" |
  "VECTOR" |
  "STAR" |
  "LINE" |
  "ELLIPSE" |
  "POLYGON" |
  "RECTANGLE" |
  "TEXT"

////////////////////////////////////////////////////////////////////////////////
// Styles
type StyleType = "PAINT" | "TEXT" | "EFFECT" | "GRID"

interface BaseStyle {
  // The string to uniquely identify a style by
  readonly id: string
  readonly type: StyleType
  name: string // Note: setting this also sets "autoRename" to false on TextNodes
  description: string
  remote: boolean
  readonly key: string // The key to use with "importStyleByKeyAsync"
  remove(): void
}

interface PaintStyle extends BaseStyle {
  type: "PAINT"
  paints: ReadonlyArray<Paint>
}

interface TextStyle extends BaseStyle {
  type: "TEXT"
  fontSize: number
  textDecoration: "NONE" | "UNDERLINE" | "STRIKETHROUGH"
  fontName: FontName
  letterSpacing: NumberWithUnits
  lineHeight: NumberWithUnits
  paragraphIndent: number
  paragraphSpacing: number
  textCase: "ORIGINAL" | "UPPER" | "LOWER" | "TITLE"
}

interface EffectStyle extends BaseStyle {
  type: "EFFECT"
  effects: ReadonlyArray<Paint>
}

interface GridStyle extends BaseStyle {
  type: "GRID"
  layoutGrids: ReadonlyArray<LayoutGrid>
}

////////////////////////////////////////////////////////////////////////////////
// Other

interface Image {
  // Returns a unique hash for the image
  readonly hash: string

  // The contents of the image file
  getBytesAsync(): Promise<Uint8Array>
}
