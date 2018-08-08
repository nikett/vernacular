import tokenize  # https://docs.python.org/3/library/tokenize.html


class Translator:
    def load_translations(self, translations_fp, separator="\t"):
        """
        Loads (non-en => en) translations, e.g. # print छापो
        :param translations_fp: 
        :param separator:
        :return: 
        """
        translations = dict()  # non-en => en mapping.
        with open(translations_fp, 'r') as trans_file:
            for line in trans_file:
                line = line.strip()
                cols = line.split(separator)
                if len(cols) == 2 and not line.startswith("#"):
                    translations[cols[1].strip()] = cols[0].strip()
        return translations

    def translate(self, src_code_iterator, necessary_translations):
        for type, name, _, _, _ in tokenize.generate_tokens(src_code_iterator):
            if type == tokenize.NAME and name in necessary_translations:
                print(f"Translating token: {type}, {name}")
                yield tokenize.NAME, necessary_translations[name]
            else:
                print(f"Not translating token: {type}, {name}")
                yield type, name

    def translate_code_file(self, src_code_fp):
        """
        Translated non-en characters (except var_names).
        :param src_code_fp: e.g., "data/sample/vernacular_code/helloworld.hi_py" 
        :return: code in en (regular python file).
        """
        source_lang, coding_lang = src_code_fp.split(".")[-1].split("_")  # my_file.hi_py => hi, py
        # target_lang is always "en" for now. Eventually we will allow code from en_2_non_en
        translations_fp = f"data/translations/{coding_lang}-{source_lang}.txt"
        # print(f"Source code file = {src_code_fp}")
        translations = self.load_translations(translations_fp)
        translated = tokenize.untokenize(
            list(self.translate(open(src_code_fp, encoding='UTF-8').readline, translations)))
        print(translated)
