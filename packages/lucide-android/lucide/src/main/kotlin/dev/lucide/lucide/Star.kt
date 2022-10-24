package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Star: ImageVector
    get() {
        if (_star != null) {
            return _star!!
        }
        _star = Builder(name = "Star", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(12.0f, 2.0f)
                lineToRelative(3.09f, 6.26f)
                lineToRelative(6.91f, 1.01f)
                lineToRelative(-5.0f, 4.87f)
                lineToRelative(1.18f, 6.88f)
                lineToRelative(-6.18f, -3.25f)
                lineToRelative(-6.18f, 3.25f)
                lineToRelative(1.18f, -6.88f)
                lineToRelative(-5.0f, -4.87f)
                lineToRelative(6.91f, -1.01f)
                lineToRelative(3.09f, -6.26f)
                close()
            }
        }
        .build()
        return _star!!
    }

private var _star: ImageVector? = null
