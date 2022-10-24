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

public val Lucide.Banana: ImageVector
    get() {
        if (_banana != null) {
            return _banana!!
        }
        _banana = Builder(name = "Banana", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(4.0f, 13.0f)
                curveToRelative(3.5f, -2.0f, 8.0f, -2.0f, 10.0f, 2.0f)
                arcToRelative(5.5f, 5.5f, 0.0f, false, true, 8.0f, 5.0f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(5.15f, 17.89f)
                curveToRelative(5.52f, -1.52f, 8.65f, -6.89f, 7.0f, -12.0f)
                curveTo(11.55f, 4.0f, 11.5f, 2.0f, 13.0f, 2.0f)
                curveToRelative(3.22f, 0.0f, 5.0f, 5.5f, 5.0f, 8.0f)
                curveToRelative(0.0f, 6.5f, -4.2f, 12.0f, -10.49f, 12.0f)
                curveTo(5.11f, 22.0f, 2.0f, 22.0f, 2.0f, 20.0f)
                curveToRelative(0.0f, -1.5f, 1.14f, -1.55f, 3.15f, -2.11f)
                close()
            }
        }
        .build()
        return _banana!!
    }

private var _banana: ImageVector? = null
