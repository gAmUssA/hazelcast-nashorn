package scripting;

import jdk.nashorn.api.scripting.NashornScriptEngine;
import jdk.nashorn.api.scripting.NashornScriptEngineFactory;
import jdk.nashorn.api.scripting.URLReader;

import javax.script.Bindings;
import javax.script.ScriptContext;
import javax.script.ScriptException;
import java.util.function.Consumer;

public class ScriptRunner {
    public static void main(String[] args) throws ScriptException {
        String[] options = new String[] {
            "-scripting",
            "-fv"
        };
        // Use Nashorn features
        NashornScriptEngineFactory factory = new NashornScriptEngineFactory();
        NashornScriptEngine nashorn = (NashornScriptEngine) factory.getScriptEngine(options);

        String scriptName = args[0];
        Bindings bindings = nashorn.createBindings();
        bindings.put("scriptFileName", scriptName);
        nashorn.setBindings(bindings, ScriptContext.ENGINE_SCOPE);

        // idea from @benontherun and @sundararajan_a https://twitter.com/sundararajan_a/status/560388671740723200
        nashorn.put("loadFromClassPath", new Consumer<String>() {
            @Override public void accept(String s) {
                try {
                    nashorn.eval(new URLReader(this.getClass().getClassLoader().getResource(s)));
                } catch (ScriptException e) {
                    throw new RuntimeException("couldn't load script from " + s);
                }
            }
        });
        nashorn.eval("load('src/main/javascript/' + scriptFileName)");
        // nashorn.eval("$EXEC('ls -al'); print($OUT);");
    }
}
