class LayerManager extends EventDispatcher {
	public get layers(): Layer[] {
		return this._layers;
	}

	/** 当前的鼠标位置 X */
	public static get mouseX(): number {
		return Laya.stage.mouseX / LayerManager.adaptScaleX;
	}

	/** 当前的鼠标位置 Y */
	public static get mouseY(): number {
		return Laya.stage.mouseY / LayerManager.adaptScaleY;
	}

    /** 获取对象的实际舞台变形数据 */
	public static getRealStageRect(target:Sprite):Rectangle{
	    const loc:Point = PointUtils.localToGlobal(target);
	    const rect:Rectangle = new Rectangle(
	        loc.x * LayerManager.adaptScale + this.left,
            loc.y * LayerManager.adaptScale + this.top,
            target.width * LayerManager.adaptScale,
            target.height * LayerManager.adaptScale);

        // const scaleFactor: number = LayerManager.stageDesignWidth / LayerManager.clientWidth;
        const scaleFactor: number = Laya.stage.designWidth / Laya.Browser.clientWidth;

        rect.x = Math.round(rect.x / scaleFactor);
        rect.y = Math.round(rect.y / scaleFactor);
        rect.width = Math.round(rect.width / scaleFactor);
        rect.height = Math.round(rect.height / scaleFactor);

        return rect;
    }

	/** Laya.stage 的设计宽度，一般为人为设定 */
	public static stageDesignWidth: number = 0;

	/** Laya.stage 的设计高度，一般为人为设定 */
	public static stageDesignHeight: number = 0;

	/** Laya.stage 的设备宽度，一般根据机器自动设定 */
	public static clientWidth: number = 0;

	/** Laya.stage 的设备高度，一般根据机器自动设定 */
	public static clientHeight: number = 0;

	/** Laya.stage.width 针对设备的适应倍数 */
	public static adaptScaleX: number = 0;

	/** Laya.stage.height 针对设备的适应倍数 */
	public static adaptScaleY: number = 0;

	/** LayerManager._layers 针对设备的适应倍数 */
	public static adaptScale: number = 0;

	/** 设备像素倍率 */
	public static pixelRatio: number = 1;

	/** 对设备适应后，LayerManager._layers 距离屏幕顶部的距离 */
	public static top: number = 0;

	/** 对设备适应后，LayerManager._layers 距离屏幕左侧的距离 */
	public static left: number = 0;

	/** 设备Top，距离屏幕顶部的真实屏幕距离 */
	public static clientTop: number = 0;

	/** 设备Left，距离屏幕左侧的真实屏幕距离 */
	public static clientLeft: number = 0;

	public static getInstance(): LayerManager {
		if (!this._instance) {
			this._instance = new LayerManager();
		}
		return this._instance;
	}
	private static _instance: LayerManager;
	/**
	 * 渲染层，一般处于游戏最底层。
	 * 主要添加街道场景、地图场景、战斗场景等。
	 */
	public renderLayer: Layer;
	/**
	 * 导航层，一般处于渲染层之上。
	 * 主要添加工具按钮栏，活动按钮栏，功能按钮栏等各个模块的快速入口，如有聊天框一般也放在这一层。
	 */
	public navLayer: Layer;
	/**
	 * 窗口层，一般处于导航层之上。
	 * 主要添加各个功能的窗口视图。
	 */
	public frameLayer: MaskLayer;
	/**
	 * 二级窗口层，一般处于窗口层之上。
	 * 主要添加各个功能窗口视图的二级窗口。
	 */
	public subFrameLayer: MaskLayer;
	/**
	 * 警告确认层，一般处于二级窗口层之上。
	 * 主要添加各种通知、提醒，以及用户的操作确认。
	 */
	public alertLayer: MaskLayer;
	/**
	 * 屏幕特效层，一般处于警告层之上。
	 * 主要添加各种屏幕特效。
	 */
	public screenEffectLayer: Layer;
	/**
	 * 滚动信息层，一般处于屏幕特效层窗口层之上。
	 * 主要添加屏幕的滚动文本提醒、喇叭滚动文本等。
	 */
	public rollMessageLayer: Layer;
	/**
	 * 引导层，一般处于二级窗口层之上。
	 * 主要添加新手引导和其他模块引导相关的视图。
	 */
	public guideLayer: MaskLayer;

	/**
	 * 小Loading层，一般处于引导层之上。
	 * 主要添加小Loading视图，小Loading即，游戏内的局部加载等后期。
	 */
	public smallLoadingLayer: MaskLayer;

	/**
	 * 公告层，一般处于小Loading层之上。
	 * 主要添加服务器公告。
	 */
	public noteLayer: Layer;
	/**
	 * 调试层，一般处于最上层。
	 * 主要添加各种调试工具的视图。
	 */
	public debugLayer: Layer;

	private readonly _layers: Layer[];

	constructor() {
		super();
		this._layers = [];
	}

	// prettier-ignore
	public initLayer(container: Laya.Stage, designWidth?: number, designHeight?: number): void {
		const pixelRatio: number = Laya.Browser.pixelRatio;

		const clientWidth: number = Laya.Browser.clientWidth * pixelRatio;
		const clientHeight: number = Laya.Browser.clientHeight * pixelRatio;

		const adaptScaleX: number = clientWidth / designWidth;
		const adaptScaleY: number = clientHeight / designHeight;

		const adaptScale: number = Math.min(adaptScaleX, adaptScaleY);

		const stageWidth: number = designWidth * adaptScaleX;
		const stageHeight: number = designHeight * adaptScaleY;

		let top: number = 0;
		let left: number = 0;
		if (adaptScale === adaptScaleX) {
			top = (stageHeight - designHeight * adaptScale) * 0.5;
		} else {
			left = (stageWidth - designWidth * adaptScale) * 0.5;
		}

		container.width = stageWidth;
		container.height = stageHeight;
		LayerManager.stageDesignWidth = designWidth;
		LayerManager.stageDesignHeight = designHeight;
		LayerManager.clientWidth = Laya.Browser.clientWidth;
		LayerManager.clientHeight = Laya.Browser.clientHeight;
		LayerManager.adaptScaleX = adaptScaleX;
		LayerManager.adaptScaleY = adaptScaleY;
		LayerManager.adaptScale = adaptScale;
		LayerManager.pixelRatio = pixelRatio;
		LayerManager.top = top;
		LayerManager.left = left;
		LayerManager.clientTop = (top / pixelRatio);
		LayerManager.clientLeft = (left / pixelRatio);

		// console.log(StringTools.wrapValueObjects(["designWidth", "designHeight"],[designWidth, designHeight]));
		// console.log(StringTools.wrapValueObjects(["clientWidth", "clientHeight"],[clientWidth, clientHeight]));
		// console.log(StringTools.wrapValueObjects(["adaptScaleX", "adaptScaleY", "pixelRatio"],[adaptScaleX, adaptScaleY, pixelRatio]));
		// console.log(StringTools.wrapValueObjects(["top", "left"], [top, left]));

		let idx: number = 0;
		this.renderLayer = this.createLayer(idx++, "renderLayer", container);
		this.navLayer = this.createLayer(idx++, "navLayer", container);
		this.frameLayer = this.createMaskLayer(idx++, "frameLayer", container);
		this.subFrameLayer = this.createMaskLayer(idx++, "subFrameLayer", container);
		this.alertLayer = this.createMaskLayer(idx++, "alertLayer", container);
		this.screenEffectLayer = this.createLayer(idx++, "screenEffectLayer", container);
		this.rollMessageLayer = this.createLayer(idx++, "rollMessageLayer", container);
		this.guideLayer = this.createMaskLayer(idx++, "guideLayer", container);
		this.smallLoadingLayer = this.createMaskLayer(idx++, "smallLoadingLayer", container);
		this.noteLayer = this.createLayer(idx++, "noteLayer", container);
		this.debugLayer = this.createLayer(idx++, "debugLayer", container);

		for (const layer of this._layers) {
		    layer.pos(left, top);
		    layer.scale(adaptScale, adaptScale);
		}
	}
	private createLayer(index: number,name: string,container: Laya.Sprite): Layer {
		this._layers.push(container.addChild(new Layer(index, name)) as Layer);
		return this._layers[this._layers.length - 1];
	}

	private createMaskLayer(index: number,name: string,container: Laya.Sprite): MaskLayer {
		this._layers.push(container.addChild(
			new MaskLayer(index, name)
		) as MaskLayer);
		return this._layers[this._layers.length - 1] as MaskLayer;
	}
}
