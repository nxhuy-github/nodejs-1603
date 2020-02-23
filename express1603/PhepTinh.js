class PhepTinh {
    constructor(pheptinh, a, b) {
        this.pheptinh = pheptinh;
        this.a = a;
        this.b = b;
    }

    getResultString() {
        let dau = this.getSign();
        const left = `${this.a} ${dau} ${this.b}`;
        const result = eval(left);
        return `${left} = ${result}`;
    }

    getSign(){
        switch (this.pheptinh) {
            case 'cong':
                return '+';
            case 'tru':
                return '-';
            case 'nhan':
                return '*';
            default:
                return '/';
        }
    }
}

module.exports = PhepTinh;