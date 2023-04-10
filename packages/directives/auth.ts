import Base64 from "crypto-js/enc-base64";
import Utf8 from "crypto-js/enc-utf8";
import AES from "crypto-js/aes";
import EncHex from "crypto-js/enc-hex";
import PadPkcs7 from "crypto-js/pad-pkcs7";
import CryptoJSCore from "crypto-js/core";

import { directiveWithInstall } from "@yh-element-plus/utils";
import type { Directive } from "vue";

/**
 * 解密
 * @param word
 * @param key
 * @param iv
 * @returns
 */
const decrypt = (word: string, key: string, iv: string) => {
  if (word.includes(":")) {
    return word;
  }

  try {
    const encryptedHexStr = EncHex.parse(word);
    const src = Base64.stringify(encryptedHexStr);
    const keys = Utf8.parse(key);
    const ivs = Utf8.parse(iv);
    const decrypt = AES.decrypt(src, keys, {
      iv: ivs,
      mode: CryptoJSCore.mode.CBC,
      padding: PadPkcs7,
    });
    const decryptedStr = decrypt.toString(Utf8);
    return decryptedStr.toString();
  } catch (error) {
    return word;
  }
};

/**
 * 获取权限列表
 */
const getAuthList = () => {
  const authCache = localStorage.getItem("auth");
  const auths = authCache ? authCache.split(",") : [];

  /** 权限Key */
  const userCode = localStorage.getItem("userCode");

  if (!userCode) {
    return [];
  }

  const authkey = userCode.padEnd(16, "0").slice(0, 16);

  return auths.map((auth) => decrypt(auth, authkey, authkey));
};

/** 权限列表 */
const authList = getAuthList();

/** 权限 */
const authDirective: Directive = {
  mounted(el, { value, arg = "disabled" }) {
    if (typeof value !== "string") {
      console.warn("v-auth directive value required string");
      return;
    }

    const enable =
      value &&
      value.split(":").length > 0 &&
      authList.some((val) => val.endsWith(value));

    // 没有权限
    if (el instanceof HTMLElement && !enable) {
      if (arg === "hidden") {
        el.remove();
      } else {
        el.addEventListener(
          "click",
          (e) => {
            e.stopPropagation();
          },
          true,
        );
        el.classList.add("is-disabled");
      }
    }
  },
};

export const YhAuth = directiveWithInstall("auth", authDirective);
