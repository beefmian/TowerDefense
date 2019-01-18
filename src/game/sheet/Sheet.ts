class NoviceGuide{public static dataArr: NoviceGuide[] = [];public static dataObj = {};public static getSheetByIndex(index: number):NoviceGuide{return NoviceGuide.dataArr[index];}public static getSheetById(id: number):NoviceGuide{return NoviceGuide.dataObj[id];}public static getSheetByFieldValue(fieldName: string, value: number | string): NoviceGuide | NoviceGuide[] {const result: NoviceGuide[] = [];for (const sheet of NoviceGuide.dataArr) {if(typeof value === 'string'){if(sheet[this._keys[fieldName]].trim()===value){result.push(sheet);}} else {if (sheet[this._keys[fieldName]] === value) {result.push(sheet);}}}if (result.length === 1) {return result.pop();} else {return result;}}public static initData(data:any[]):void{const sheetLen:number = data.length;for (let i = 0; i < sheetLen; i++) {NoviceGuide.dataArr[i] = new NoviceGuide();for(const key of Object.keys(this._keys)){NoviceGuide.dataArr[i][key] = data[i][this._keys[key]];}NoviceGuide.dataObj[data[i][this._keys.id]] = NoviceGuide.dataArr[i];}}private static _keys = {id:"b",groupId:"c",stepId:"d",completed:"e",type:"f",activateType:"g",activateValue:"h",eventName:"i",eventParam:"j",position:"k",interactPosition:"l",fingerPosition:"m",specialInteractArea:"n",skipPos:"o",script:"p"};private b: number;public get id(): number{return this.b;}public set id(value:number){this.b = value;}private c: number;public get groupId(): number{return this.c;}public set groupId(value:number){this.c = value;}private d: number;public get stepId(): number{return this.d;}public set stepId(value:number){this.d = value;}private e: number;public get completed(): number{return this.e;}public set completed(value:number){this.e = value;}private f: number;public get type(): number{return this.f;}public set type(value:number){this.f = value;}private g: number;public get activateType(): number{return this.g;}public set activateType(value:number){this.g = value;}private h: number;public get activateValue(): number{return this.h;}public set activateValue(value:number){this.h = value;}private i: string;public get eventName(): string{return this.i;}public set eventName(value:string){this.i = value;}private j: string;public get eventParam(): string{return this.j;}public set eventParam(value:string){this.j = value;}private k: string;public get position(): string{return this.k;}public set position(value:string){this.k = value;}private l: string;public get interactPosition(): string{return this.l;}public set interactPosition(value:string){this.l = value;}private m: string;public get fingerPosition(): string{return this.m;}public set fingerPosition(value:string){this.m = value;}private n: string;public get specialInteractArea(): string{return this.n;}public set specialInteractArea(value:string){this.n = value;}private o: string;public get skipPos(): string{return this.o;}public set skipPos(value:string){this.o = value;}private p: string;public get script(): string{return this.p;}public set script(value:string){this.p = value;}}// prettier-ignore
class Sheet {public static initSheets(data): void {const classInstance = {NoviceGuide};for (const sheet of data) {const sheetClass = classInstance[sheet.sheetName];if (!sheetClass) {console.error('找不到表{', sheet.sheetName + '}');continue}sheetClass.initData(sheet.data);}}}// prettier-ignore
