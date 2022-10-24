package dev.lucide.lucide

import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.PathFillType
import androidx.compose.ui.graphics.PathFillType.Companion.NonZero
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.StrokeCap
import androidx.compose.ui.graphics.StrokeCap.Companion.Round
import androidx.compose.ui.graphics.StrokeJoin
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.graphics.vector.ImageVector.Builder
import androidx.compose.ui.graphics.vector.path
import androidx.compose.ui.unit.dp
import dev.lucide.Lucide

public val Lucide.Apple: ImageVector
    get() {
        if (_apple != null) {
            return _apple!!
        }
        _apple = Builder(name = "Apple", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(12.0f, 20.94f)
                curveToRelative(1.5f, 0.0f, 2.75f, 1.06f, 4.0f, 1.06f)
                curveToRelative(3.0f, 0.0f, 6.0f, -8.0f, 6.0f, -12.22f)
                arcTo(4.91f, 4.91f, 0.0f, false, false, 17.0f, 5.0f)
                curveToRelative(-2.22f, 0.0f, -4.0f, 1.44f, -5.0f, 2.0f)
                curveToRelative(-1.0f, -0.56f, -2.78f, -2.0f, -5.0f, -2.0f)
                arcToRelative(4.9f, 4.9f, 0.0f, false, false, -5.0f, 4.78f)
                curveTo(2.0f, 14.0f, 5.0f, 22.0f, 8.0f, 22.0f)
                curveToRelative(1.25f, 0.0f, 2.5f, -1.06f, 4.0f, -1.06f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(10.0f, 2.0f)
                curveToRelative(1.0f, 0.5f, 2.0f, 2.0f, 2.0f, 5.0f)
            }
        }
        .build()
        return _apple!!
    }

private var _apple: ImageVector? = null
