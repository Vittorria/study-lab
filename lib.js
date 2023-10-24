function binToOct(binNum) {
  /*Promenne*/
  let octNum = "";
  let naDruhou = 1;
  let octCislice = 0;

  /* Cislo v bin systemu od konce*/
  for (let i = binNum.length - 1; i >= 0; i--) {
    const aktualniCislice = parseInt(binNum[i], 2);
    octCislice += aktualniCislice * naDruhou;
    naDruhou *= 2;

    /* jestli naDruhou = 8*/
    if (naDruhou === 8) {
      octNum = octCislice + octNum;
      naDruhou = 1;
      octCislice = 0;
    }
  }

  /*pridani posledni cislice*/
  octNum = octCislice + octNum;

  return octNum;
}

module.exports = { binToOct };

/* zkouska*/
// const binNum = "11111010101";
// const octVysledek = binToOct(binNum);
// console.log(`Cislo v binarni soustave: ${binNum} => stejne cislo v osmickove soustave: ${octVysledek}`);
