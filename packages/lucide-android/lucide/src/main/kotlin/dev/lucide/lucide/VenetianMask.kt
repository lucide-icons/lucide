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

public val Lucide.VenetianMask: ImageVector
    get() {
        if (_venetianMask != null) {
            return _venetianMask!!
        }
        _venetianMask = Builder(name = "VenetianMask", defaultWidth = 24.0.dp, defaultHeight =
                24.0.dp, viewportWidth = 24.0f, viewportHeight = 24.0f).apply {
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(2.0f, 12.0f)
                arcToRelative(5.0f, 5.0f, 0.0f, false, false, 5.0f, 5.0f)
                arcToRelative(8.0f, 8.0f, 0.0f, false, true, 5.0f, 2.0f)
                arcToRelative(8.0f, 8.0f, 0.0f, false, true, 5.0f, -2.0f)
                arcToRelative(5.0f, 5.0f, 0.0f, false, false, 5.0f, -5.0f)
                verticalLineTo(7.0f)
                horizontalLineToRelative(-5.0f)
                arcToRelative(8.0f, 8.0f, 0.0f, false, false, -5.0f, 2.0f)
                arcToRelative(8.0f, 8.0f, 0.0f, false, false, -5.0f, -2.0f)
                horizontalLineTo(2.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(6.0f, 11.0f)
                curveToRelative(1.5f, 0.0f, 3.0f, 0.5f, 3.0f, 2.0f)
                curveToRelative(-2.0f, 0.0f, -3.0f, 0.0f, -3.0f, -2.0f)
                close()
            }
            path(fill = SolidColor(Color(0x00000000)), stroke = SolidColor(Color(0xFF000000)),
                    strokeLineWidth = 2.0f, strokeLineCap = Round, strokeLineJoin =
                    StrokeJoin.Companion.Round, strokeLineMiter = 4.0f, pathFillType = NonZero) {
                moveTo(18.0f, 11.0f)
                curveToRelative(-1.5f, 0.0f, -3.0f, 0.5f, -3.0f, 2.0f)
                curveToRelative(2.0f, 0.0f, 3.0f, 0.0f, 3.0f, -2.0f)
                close()
            }
        }
        .build()
        return _venetianMask!!
    }

private var _venetianMask: ImageVector? = null
