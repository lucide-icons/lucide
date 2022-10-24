@file:Repository("https://jitpack.io")
@file:Repository("https://maven.google.com")
@file:Repository("https://jetbrains.bintray.com/trove4j")
@file:Repository("https://jcenter.bintray.com")

@file:DependsOn("com.github.DevSrSouza:svg-to-compose:-SNAPSHOT")
@file:DependsOn("com.google.guava:guava:23.0")
@file:DependsOn("com.android.tools:sdk-common:27.2.0-alpha16")
@file:DependsOn("com.android.tools:common:27.2.0-alpha16")
@file:DependsOn("com.squareup:kotlinpoet:1.7.2")
@file:DependsOn("org.ogce:xpp3:1.1.6")

import br.com.devsrsouza.svg2compose.IconNameTransformer
import br.com.devsrsouza.svg2compose.ParsingResult
import br.com.devsrsouza.svg2compose.Svg2Compose
import br.com.devsrsouza.svg2compose.VectorType
import java.io.File

val assetsDir = File("../icons")
val srcDir = File("../packages/lucide-android/lucide/src/main/kotlin/")

Svg2Compose.parse(
    applicationIconPackage = "dev.lucide",
    accessorName = "Lucide",
    outputSourceDirectory = srcDir,
    vectorsDirectory = assetsDir,
    type = VectorType.SVG,
    allAssetsPropertyName = "AllIcons",
    iconNameTransformer =  object : IconNameTransformer{
      override fun invoke(iconName: String, group: String): String {
        return iconName.split("-").joinToString("") { it.capitalize() }
      }
    },
)

/*
* 1. install kotlin cli to run kotlin script 'brew install kotlin'
* 2. copy all svg icons, with the right naming (same as on figma) on gta_svg_icons folder
* 3. run 'kotlin generateAndroid.kts'
* 4. check for the generated icons (for example GtaIcon.IconProfile)
* */
