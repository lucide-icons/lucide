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

public val Lucide.Brush: ImageVector
    get() {
        if (_brush != null) {
            return _brush!!
        }
        _brush = Builder(name = "Brush", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveToRelative(9.06f, 11.9f)
                lineToRelative(8.07f, -8.06f)
                arcToRelative(2.85f, 2.85f, 0.0f, true, true, 4.03f, 4.03f)
                lineToRelative(-8.06f, 8.08f)
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(7.07f, 14.94f)
                curveToRelative(-1.66f, 0.0f, -3.0f, 1.35f, -3.0f, 3.02f)
                curveToRelative(0.0f, 1.33f, -2.5f, 1.52f, -2.0f, 2.02f)
                curveToRelative(1.08f, 1.1f, 2.49f, 2.02f, 4.0f, 2.02f)
                curveToRelative(2.2f, 0.0f, 4.0f, -1.8f, 4.0f, -4.04f)
                arcToRelative(3.01f, 3.01f, 0.0f, false, false, -3.0f, -3.02f)
                close()
            }
        }
        .build()
        return _brush!!
    }

private var _brush: ImageVector? = null
