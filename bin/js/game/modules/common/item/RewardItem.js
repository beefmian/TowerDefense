/*
* 奖励物品Item;
*/
class RewardItem extends ui.common.item.RewardItemUI {
    constructor() {
        super();
    }
    create(url, count) {
        let self = this;
        self.itemImg.skin = url;
        self.txt_count.text = "x" + MathUtils.bytesToSize(count);
    }
}
//# sourceMappingURL=RewardItem.js.map