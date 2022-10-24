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

public val Lucide.Flame: ImageVector
    get() {
        if (_flame != null) {
            return _flame!!
        }
        _flame = Builder(name = "Flame", defaultWidth = 24.0.dp, defaultHeight = 24.0.dp,
                viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(8.5f, 14.5f)
                arcTo(2.5f, 2.5f, 0.0f, false, false, 11.0f, 12.0f)
                curveToRelative(0.0f, -1.38f, -0.5f, -2.0f, -1.0f, -3.0f)
                curveToRelative(-1.072f, -2.143f, -0.224f, -4.054f, 2.0f, -6.0f)
                curveToRelative(0.5f, 2.5f, 2.0f, 4.9f, 4.0f, 6.5f)
                curveToRelative(2.0f, 1.6f, 3.0f, 3.5f, 3.0f, 5.5f)
                arcToRelative(7.0f, 7.0f, 0.0f, true, true, -14.0f, 0.0f)
                curveToRelative(0.0f, -1.153f, 0.433f, -2.294f, 1.0f, -3.0f)
                arcToRelative(2.5f, 2.5f, 0.0f, false, false, 2.5f, 2.5f)
                close()
            }
        }
        .build()
        return _flame!!
    }

private var _flame: ImageVector? = null
